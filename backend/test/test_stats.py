from doppelkopf.db import db
from doppelkopf import stats
from doppelkopf.events import EventTypes, Event

from datetime import datetime, timedelta


def test_should_calculate_weekly_stats(app):
    save_stats()

    s = stats.calculate_weekly()

    assert s[EventTypes.GAME_START] == [5, 6, 9]


def test_should_calculate_total_stats(app):
    save_stats()

    s = stats.calculate_total()

    assert s[EventTypes.GAME_START] == 20


def save_stats():
    events = []
    for i in range(0, 5):
        events.append(Event(
            created_at=datetime.utcnow() - timedelta(days=2),
            event_type=EventTypes.GAME_START
        ))

    for i in range(0, 6):
        events.append(Event(
            created_at=datetime.utcnow() - timedelta(days=1),
            event_type=EventTypes.GAME_START
        ))

    for i in range(0, 9):
        events.append(Event(
            created_at=datetime.utcnow(),
            event_type=EventTypes.GAME_START
        ))
    db.session.add_all(events)
    db.session.commit()
