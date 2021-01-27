from .db import db
from datetime import datetime
from enum import Enum


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    finished_at = db.Column(db.DateTime, nullable=True)
    winner = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f"<Game: {self.id, self.started_at, self.finished_at, self.winner}>"


class PlayerStates(Enum):
    ANONYMOUS = (1,)
    REGISTERED = (2,)
    DELETED = 3


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    state = db.Column(db.Enum(PlayerStates), nullable=False, server_default="")
    name = db.Column(db.String(128), nullable=False, default="unknown")

    def __repr__(self):
        return f"<Player: {self.id, self.name, self.state, self.created_at}>"
