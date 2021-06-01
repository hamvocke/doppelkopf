from doppelkopf.db import db
from doppelkopf.game import Game
import json
import datetime


def test_should_emit_error_when_joining_unknown_game(socket_client):
    payload = _join_payload(42)

    socket_client.emit("join", payload)

    received_events = socket_client.get_received()
    assert len(received_events) == 2
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "error"
    assert received_events[1]["args"][0] == "Game with id 42 not found"


def test_should_emit_joined_event_when_joining_successfully(client, socket_client):
    game_id = _create_game(client)
    # TODO: make payloads more consistent
    payload = _join_payload(game_id)

    socket_client.emit("join", payload)

    expected_payload = {
        "game": {"id": game_id, "players": [{"id": 1, "name": "April", "online": True}]}
    }
    received_events = socket_client.get_received()
    assert len(received_events) == 2
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "joined"
    assert received_events[1]["args"][0] == json.dumps(expected_payload)


def test_should_update_game_on_join(client, socket_client):
    game_id = _create_game(client)
    payload = _join_payload(game_id)

    socket_client.emit("join", payload)

    g = Game.query.get(game_id)
    assert len(g.players) == 1
    assert g.players[0].session_id is not None


def test_should_not_let_more_than_4_players_join(client, socket_client):
    game_id = _create_game(client)

    socket_client.emit("join", _join_payload(game_id))
    socket_client.emit("join", _join_payload(game_id))
    socket_client.emit("join", _join_payload(game_id))
    socket_client.emit("join", _join_payload(game_id))

    socket_client.emit("join", _join_payload(game_id))

    received_events = socket_client.get_received()
    g = Game.query.get(game_id)
    assert len(received_events) == 6
    assert received_events[5]["name"] == "error"
    assert (
        received_events[5]["args"][0]
        == f"Can't join game {game_id}. Game has 4 players already."
    )
    assert len(g.players) == 4


def test_should_reconnect_on_join(client, socket_client):
    game_id = _create_game(client)
    _start_game(game_id)
    socket_client.emit("join", _join_payload(game_id))
    socket_client.disconnect()
    socket_client.connect()
    player_id = Game.query.get(game_id).players[0].id

    socket_client.emit("join", {"game": {"id": game_id}, "player": {"remoteId": player_id, "name": "April"}})

    g = Game.query.get(game_id)
    assert len(g.players) == 1


def test_should_send_disconnected_event_on_disconnect(client, socket_client):
    game_id = _create_game(client)
    socket_client.emit("join", _join_payload(game_id))
    socket_client.emit("join", _join_payload(game_id))

    socket_client.emit("disconnect")

    received_events = socket_client.get_received()
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "joined"
    assert received_events[2]["name"] == "joined"
    assert received_events[3]["name"] == "disconnected"


def test_should_mark_player_as_disconnected_on_disconnect_if_game_is_started(client, socket_client):
    game_id = _create_game(client)
    _start_game(game_id)
    socket_client.emit("join", _join_payload(game_id))

    socket_client.emit("disconnect")

    g = Game.query.get(game_id)
    assert len(g.players) == 1
    assert g.players[0].disconnected_at is not None
    received_events = socket_client.get_received()
    expected_payload = {
        "game": {"id": game_id, "players": [{"id": 1, "name": "April", "online": False}]}
    }
    assert received_events[2]["name"] == "disconnected"
    assert received_events[2]["args"][0] == json.dumps(expected_payload)


def test_remove_player_on_disconnect_if_game_is_not_started_yet(client, socket_client):
    game_id = _create_game(client)
    socket_client.emit("join", _join_payload(game_id))

    socket_client.emit("disconnect")

    g = Game.query.get(game_id)
    assert len(g.players) == 0
    received_events = socket_client.get_received()
    expected_payload = {
        "game": {"id": game_id, "players": []}
    }
    assert received_events[2]["name"] == "disconnected"
    assert received_events[2]["args"][0] == json.dumps(expected_payload)


def _create_game(client) -> int:
    response = client.post("/api/game")
    return response.get_json()["game"]["id"]


def _start_game(game_id):
    # TODO use proper websocket event to start game once available
    g = Game.query.get(game_id)
    g.started_at = datetime.datetime.utcnow()
    db.session.add(g)
    db.session.commit()

def _join_payload(game_id):
    return {"game": {"id": game_id}, "player": {"name": "April"}}
