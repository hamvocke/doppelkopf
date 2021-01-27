from .db import db
from datetime import datetime
from enum import Enum


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    finished_at = db.Column(db.DateTime, nullable=True)
    winner = db.Column(db.Integer, nullable=True)
    players = db.relationship("Player")

    def __repr__(self):
        return f"<Game: {self.id, self.started_at, self.finished_at, self.winner}>"


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    name = db.Column(db.String(128), nullable=False, default="unknown")
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Player: {self.id, self.name, self.created_at}>"

    def serialize(self):
        return {"name": self.name}
