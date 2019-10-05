from doppelkopf.events import Event


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
