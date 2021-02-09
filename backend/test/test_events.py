from doppelkopf.events import Event, EventTypes
from doppelkopf.db import db


def test_save_event(app):
    start_game = Event(event_type=EventTypes.GAME_SINGLEPLAYER_WIN)
    db.session.add(start_game)
    db.session.commit()

    events = Event.query.all()

    assert events[0].event_type == EventTypes.GAME_SINGLEPLAYER_WIN
