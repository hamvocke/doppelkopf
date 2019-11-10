from doppelkopf.events import Event
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

    events = Event.query.all()
    assert response.status_code == 201
    assert b"Registered new game" in response.data
    assert len(events) == 1


def test_should_return_toggles(client):
    save_toggle("some-toggle", enabled=True)

    response = client.get("/api/features")
    data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert data["features"][0]["name"] == "some-toggle"
    assert data["features"][0]["enabled"] is True


def save_toggle(name="some-toggle", enabled=True) -> Toggle:
    toggle = Toggle(name=name, enabled=enabled)
    db.session.add(toggle)
    db.session.commit()
    return toggle
