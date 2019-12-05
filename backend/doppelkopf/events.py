from doppelkopf.db import db
from datetime import datetime
from enum import Enum


class EventTypes(Enum):
    GAME_START = 1
    GAME_FINISH = 2
    GAME_WIN = 3
    GAME_LOSE = 4


class EventType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    def __repr__(self):
        return "<EventType{}>".format(self.name)

    @staticmethod
    def insert_all():
        if EventType.query.get(EventTypes.GAME_START) is None:
            print("Creating GAME_START event type")
            game_start = EventType(id=EventTypes.GAME_START, name="game.start")
            db.session.add(game_start)

        if EventType.query.get(EventTypes.GAME_FINISH) is None:
            print("Creating GAME_FINISH event type")
            game_finish = EventType(id=EventTypes.GAME_FINISH, name="game.finish")
            db.session.add(game_finish)

        if EventType.query.get(EventTypes.GAME_WIN) is None:
            print("Creating GAME_WIN event type")
            game_win = EventType(id=EventTypes.GAME_WIN, name="game.win")
            db.session.add(game_win)

        if EventType.query.get(EventTypes.GAME_LOSE) is None:
            print("Creating GAME_LOSE event type")
            game_lose = EventType(id=EventTypes.GAME_LOSE, name="game.lose")
            db.session.add(game_lose)

        db.session.commit()


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type_id = db.Column(
        db.Integer, db.ForeignKey("event_type.id"), nullable=False
    )
    event_type = db.relationship("EventType", backref=db.backref("events", lazy=True))
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
