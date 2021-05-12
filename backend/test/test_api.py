from doppelkopf.toggles import Toggle
from doppelkopf.db import db
from flask import json


def test_index(client):
    response = client.get("/api/")
    assert response.status_code == 200
    assert b"Healthy" in response.data


def test_should_create_game(client):
    response = client.post("/api/game")
    data = response.get_json()

    assert response.status_code == 201
    assert data["game"]["id"] is not None
    assert data["game"]["players"] == []


def test_should_get_game(client):
    game_id = start_game(client)

    response = client.get(f"/api/game/{game_id}")
    data = response.get_json()

    assert response.status_code == 200
    assert data["game"]["id"] == game_id
    assert data["game"]["players"] == []


def test_should_404_when_getting_unknown_game(client):
    game_id = 9999

    response = client.get(f"/api/game/{game_id}")
    data = response.get_json()

    assert response.status_code == 404


def test_should_add_cors_header_when_creating_game(client):
    response = client.post("/api/game")
    assert response.headers["Access-Control-Allow-Origin"] == "*"


def test_should_return_toggles(client):
    save_toggle("some-toggle", enabled=True)
    save_toggle("another-toggle", enabled=False)

    response = client.get("/api/features")
    data = response.get_json()

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
    return response.get_json()["game"]["id"]
