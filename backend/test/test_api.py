from doppelkopf.toggles import Toggle
from doppelkopf.db import db
from flask import json


def test_index(client):
    response = client.get("/api/")
    assert response.status_code == 200
    assert b"Healthy" in response.data


def test_should_join_game(client):
    game_id = start_game(client)

    payload = {"player": {"name": "April"}}
    response = client.post(f"/api/game/{game_id}/join", json=payload)
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data["game"]["id"] == game_id
    assert data["game"]["players"] == [{"name": "April"}]


def test_should_return_bad_request_when_joining_game_without_data(client):
    game_id = start_game(client)

    response = client.post(f"/api/game/{game_id}/join")

    assert response.status_code == 400


def test_should_return_not_found_when_joining_unknown_game(client):
    game_id = 42

    payload = {"player": {"name": "April"}}
    response = client.post(f"/api/game/{game_id}/join", json=payload)

    assert response.status_code == 404


def test_should_return_toggles(client):
    save_toggle("some-toggle", enabled=True)
    save_toggle("another-toggle", enabled=False)

    response = client.get("/api/features")
    data = json.loads(response.get_data(as_text=True))

    expected_data = """
    {
        "features": {
            "some-toggle": true,
            "another-toggle": false
        }
    }"""

    assert response.status_code == 200
    assert data == json.loads(expected_data)


def save_toggle(name="some-toggle", enabled=True) -> Toggle:
    toggle = Toggle(name=name, enabled=enabled)
    db.session.add(toggle)
    db.session.commit()
    return toggle


def start_game(client) -> int:
    response = client.post("/api/game")
    return json.loads(response.data)["game"]["id"]
