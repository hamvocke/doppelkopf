from doppelkopf.db import db
from datetime import datetime
from enum import Enum


class EventTypes(Enum):
    GAME_SINGLEPLAYER_START = 0
    GAME_SINGLEPLAYER_WIN = 1
    GAME_SINGLEPLAYER_LOSE = 2

    GAME_MULTIPLAYER_START = 100

    CRON_DB_BACKUP = 1000


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.Enum(EventTypes), nullable=False, server_default="")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())

    def __repr__(self):
        return f"<Event: {self.type}>"
