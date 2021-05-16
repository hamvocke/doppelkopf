from .db import db
from datetime import datetime


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    started_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    finished_at = db.Column(db.DateTime, nullable=True)
    winner = db.Column(db.Integer, nullable=True)
    players = db.relationship("Player")

    def __repr__(self):
        return f"<Game: {self.id, self.started_at, self.finished_at, self.winner}>"

    def serialize(self):
        return {
            "id": self.id,
            "players": [player.serialize() for player in self.players],
        }

    def join(self, player):
        if len(self.players) == 4:
            raise Exception("Can't join game. Game has 4 players already.")
        # todo check if player is already there, update if so
        self.players.append(player)


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow())
    name = db.Column(db.String(128), nullable=False, default="unknown")
    game_id = db.Column(db.Integer, db.ForeignKey("game.id"), nullable=False)
    session_id = db.Column(db.String(128), nullable=True)
    disconnected_at = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f"<Player: {self.id, self.name, self.created_at}>"

    def serialize(self):
        return {"id": self.id, "name": self.name}
