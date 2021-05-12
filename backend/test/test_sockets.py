from doppelkopf.db import db


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
