from doppelkopf.events import Event, EventTypes
from doppelkopf.toggles import Toggle
from doppelkopf.db import db
from flask import json


def test_index(client):
    response = client.get("/api/")
    assert response.status_code == 200
    assert b"Healthy" in response.data


def test_should_save_start_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post("/api/game/new")

    assert response.status_code == 201
    assert json.loads(response.data)["game_id"] == 1
    events = Event.query.all()
    assert len(events) == 1


def test_should_save_win_game_event(client):
    events = Event.query.all()
    assert len(events) == 0

    game_id = start_game(client)
    response = client.post(f"/api/game/{game_id}/win")

    assert response.status_code == 201
    win_event = Event.query.filter(Event.event_type == EventTypes.GAME_WIN).first()
    assert win_event is not None


def test_should_return_404_when_winning_unknown_game(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post(f"/api/game/99/win")

    assert response.status_code == 404


def test_should_save_lose_game_event(client):
    events = Event.query.all()
    assert len(events) == 0

    game_id = start_game(client)
    response = client.post(f"/api/game/{game_id}/lose")

    assert response.status_code == 201
    win_event = Event.query.filter(Event.event_type == EventTypes.GAME_LOSE).first()
    assert win_event is not None



def test_should_return_404_when_losing_unknown_game(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post(f"/api/game/99/lose")

    assert response.status_code == 404


def test_should_join_game(client):
    game_id = start_game(client)

    response = client.post(f"/api/game/{game_id}/join", json={"playerName": "April"})
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data["gameId"] == game_id
    assert data["players"] == [{"name": "April"}]


def test_should_return_bad_request_when_joining_game_without_data(client):
    game_id = start_game(client)

    response = client.post(f"/api/game/{game_id}/join")

    assert response.status_code == 400


def test_should_return_not_found_when_joining_unknown_game(client):
    game_id = 42

    response = client.post(f"/api/game/{game_id}/join", json={"playerName": "April"})

    assert response.status_code == 404


def test_should_return_toggles(client):
    save_toggle("some-toggle", enabled=True)

    response = client.get("/api/features")
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data["features"]["some-toggle"]["name"] == "some-toggle"
    assert data["features"]["some-toggle"]["enabled"] is True


def test_should_log_cron_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post(f"/api/cron/db-backup")

    assert response.status_code == 200
    cron_event = Event.query.filter(
        Event.event_type == EventTypes.CRON_DB_BACKUP
    ).first()
    assert cron_event is not None


def save_toggle(name="some-toggle", enabled=True) -> Toggle:
    toggle = Toggle(name=name, enabled=enabled)
    db.session.add(toggle)
    db.session.commit()
    return toggle


def start_game(client) -> int:
    response = client.post("/api/game/new")
    return json.loads(response.data)["game_id"]
