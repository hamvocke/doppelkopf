from doppelkopf.db import db
import json


def start_game(client) -> int:
    response = client.post("/api/game")
    return response.get_json()["game"]["id"]


def test_should_emit_error_when_joining_unknown_game(socket_client):
    payload = {
        "game": {
            "id": 42
        },
        "player": {
            "id": 1,
            "name": "April"
        }
    }
    socket_client.emit("join", payload)

    received_events = socket_client.get_received()
    assert len(received_events) == 2
    assert received_events[0]["name"] == "connected"
    assert received_events[1]["name"] == "error"
    assert received_events[1]["args"][0] == "Game with id 42 not found"


def test_should_emit_joined_event_when_joining_successfully(client, socket_client):
    game_id = start_game(client)

    # TODO: make payloads more consistent
    payload = {
        "game": {
            "id": game_id
        },
        "player": {
            "id": 1,
            "name": "April"
        }
    }
    socket_client.emit("join", payload)


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
    assert received_events[1]["args"][0] == json.dumps(expected_payload)
