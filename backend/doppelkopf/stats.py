from .db import db
from .events import Event, EventTypes
from sqlalchemy.sql.functions import func

from datetime import datetime, timedelta


def calculate_weekly():
    now = datetime.utcnow()
    last_week = datetime.utcnow() - timedelta(days=7)
    events_by_date = (
        db.session.query(
            Event.created_at, Event.event_type, func.count(Event.event_type)
        )
        .group_by(Event.event_type, func.date(Event.created_at))
        .filter(Event.created_at.between(last_week, now))
        .all()
    )

    def filter_events(events, type):
        return [
            [event.created_at.strftime("%Y-%m-%d"), event[2]] for event in events if event.event_type == type
        ]

    return {
        EventTypes.GAME_START: filter_events(events_by_date, EventTypes.GAME_START),
        EventTypes.GAME_WIN: filter_events(events_by_date, EventTypes.GAME_WIN),
        EventTypes.GAME_LOSE: filter_events(events_by_date, EventTypes.GAME_LOSE),
    }


def calculate_total():
    return {
        EventTypes.GAME_START: Event.query.filter(
            Event.event_type == EventTypes.GAME_START
        ).count(),
        EventTypes.GAME_WIN: Event.query.filter(
            Event.event_type == EventTypes.GAME_WIN
        ).count(),
        EventTypes.GAME_LOSE: Event.query.filter(
            Event.event_type == EventTypes.GAME_LOSE
        ).count(),
    }
