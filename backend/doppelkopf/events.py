from doppelkopf.db import db
from datetime import datetime
from enum import Enum


class EventTypes(Enum):
    GAME_START = 1
    GAME_FINISH = 2
    GAME_WIN = 3
    GAME_LOSE = 4

    CRON_DB_BACKUP = 1000


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.Enum(EventTypes), nullable=False, server_default="")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    game_id = db.Column(
        db.Integer, db.ForeignKey("game.id"), nullable=False, default=-1
    )

    def __repr__(self):
        return f"<Event: {self.type}>"


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    finished_at = db.Column(db.DateTime, nullable=True)
    winner = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f"<Game: {self.id, self.started_at, self.finished_at, self.winner}>"
