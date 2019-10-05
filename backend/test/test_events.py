from doppelkopf.events import Event
from doppelkopf.db import db


def test_save_event(app):
    start_game = Event(event_type_id=1)
    db.session.add(start_game)
    db.session.commit()

    events = Event.query.all()

    assert len(events) == 1
