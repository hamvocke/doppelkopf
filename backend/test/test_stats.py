from doppelkopf.db import db
from doppelkopf import stats
from doppelkopf.events import EventTypes, Event

from datetime import datetime, timedelta


def test_should_calculate_weekly_stats(app):
    day1 = datetime.utcnow() - timedelta(days=6)
    day2 = datetime.utcnow() - timedelta(days=5)
    day3 = datetime.utcnow() - timedelta(days=4)
    day4 = datetime.utcnow() - timedelta(days=3)
    day5 = datetime.utcnow() - timedelta(days=2)
    day6 = datetime.utcnow() - timedelta(days=1)
    day7 = datetime.utcnow() - timedelta(days=0)
    save_stats(day1, day2, day3, day4, day5, day6, day7)

    s = stats.calculate_weekly()

    assert s[EventTypes.GAME_START] == [
        [day1.strftime("%Y-%m-%d"), 1],
        [day2.strftime("%Y-%m-%d"), 2],
        [day3.strftime("%Y-%m-%d"), 3],
        [day4.strftime("%Y-%m-%d"), 4],
        [day5.strftime("%Y-%m-%d"), 5],
        [day6.strftime("%Y-%m-%d"), 6],
        [day7.strftime("%Y-%m-%d"), 7],
    ]


def test_should_calculate_total_stats(app):
    save_stats(datetime.utcnow() - timedelta(days=0), datetime.utcnow() - timedelta(days=0))

    s = stats.calculate_total()

    assert s[EventTypes.GAME_START] == 3


def save_stats(*dates):
    events = []
    n = 1
    for date in dates:
        for i in range(0, n):
            events.append(Event(created_at=date, event_type=EventTypes.GAME_START,))
        n = n + 1

    db.session.add_all(events)
    db.session.commit()
