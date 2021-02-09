from doppelkopf.events import Event, EventTypes



def test_should_save_start_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post("/api/metrics/game/singleplayer/start")

    assert response.status_code == 201
    events = Event.query.all()
    assert len(events) == 1


def test_should_save_win_game_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post("/api/metrics/game/singleplayer/win")

    assert response.status_code == 201
    win_event = Event.query.filter(Event.event_type == EventTypes.GAME_SINGLEPLAYER_WIN).first()
    assert win_event is not None


def test_should_save_win_game_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post("/api/metrics/game/singleplayer/lose")

    assert response.status_code == 201
    win_event = Event.query.filter(Event.event_type == EventTypes.GAME_SINGLEPLAYER_LOSE).first()
    assert win_event is not None

def test_should_log_cron_event(client):
    events = Event.query.all()
    assert len(events) == 0

    response = client.post("/api/metrics/cron/db-backup")

    assert response.status_code == 200
    cron_event = Event.query.filter(
        Event.event_type == EventTypes.CRON_DB_BACKUP
    ).first()
    assert cron_event is not None
