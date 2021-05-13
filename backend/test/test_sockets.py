from doppelkopf.db import db
from doppelkopf.game import Game
import json


def test_should_emit_error_when_joining_unknown_game(socket_client):
    payload = _join_payload(42, 23)

    socket_client.emit("join", payload)

    received_events = socket_client.get_received()
    assert len(received_events) == 2
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "error"
    assert received_events[1]["args"][0] == "Game with id 42 not found"


def test_should_emit_joined_event_when_joining_successfully(client, socket_client):
    game_id = _start_game(client)
    # TODO: make payloads more consistent
    payload = _join_payload(game_id, 42)

    socket_client.emit("join", payload)

    # TODO: player id is not relevant on join event
    expected_payload  = {
        "game": {
            "id": game_id,
            "players": [{
                "id": 1,
                "name": "April"
            }]
        }
    }
    received_events = socket_client.get_received()
    assert len(received_events) == 2
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "joined"
    assert received_events[1]["args"][0] == json.dumps(expected_payload)


def test_should_update_game_on_join(client, socket_client):
    game_id = _start_game(client)
    payload = _join_payload(game_id, 42)

    socket_client.emit("join", payload)

    g = Game.query.get(game_id)
    assert len(g.players) == 1
    assert g.players[0].id == 1
    assert g.players[0].session_id is not None


def test_should_not_let_more_than_4_players_join(client, socket_client):
    game_id = _start_game(client)

    socket_client.emit("join", _join_payload(game_id, 42))
    socket_client.emit("join", _join_payload(game_id, 43))
    socket_client.emit("join", _join_payload(game_id, 44))
    socket_client.emit("join", _join_payload(game_id, 45))

    socket_client.emit("join", _join_payload(game_id, 99))

    received_events = socket_client.get_received()
    g = Game.query.get(game_id)
    assert len(received_events) == 6
    assert received_events[5]["name"] == "error"
    assert received_events[5]["args"][0] == f"Can't join game {game_id}. Game has 4 players already."
    assert len(g.players) == 4


def _start_game(client) -> int:
    response = client.post("/api/game")
    return response.get_json()["game"]["id"]


def _join_payload(game_id, player_id):
    return {
        "game": {
            "id": game_id
        },
        "player": {
            "id": player_id,
            "name": "April"
        }
    }
