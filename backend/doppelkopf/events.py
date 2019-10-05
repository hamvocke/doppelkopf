from doppelkopf.db import db
from datetime import datetime


class EventTypes:
    GAME_START = 1
    GAME_FINISH = 2
    GAME_WIN = 3
    GAME_LOSE = 4

class EventType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    def __repr__(self):
        return '<EventType{}>'.format(self.name)

    @staticmethod
    def insert_all():
        game_start = EventType(id=EventTypes.GAME_START, name="game.start")
        game_finish = EventType(id=EventTypes.GAME_FINISH, name="game.finish")
        game_win = EventType(id=EventTypes.GAME_WIN, name="game.win")
        game_lose = EventType(id=EventTypes.GAME_LOSE, name="game.lose")
        db.session.add(game_start)
        db.session.add(game_finish)
        db.session.add(game_win)
        db.session.add(game_lose)
        db.session.commit()


class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type_id = db.Column(db.Integer, db.ForeignKey('event_type.id'),
        nullable=False)
    event_type = db.relationship('EventType',
        backref=db.backref('events', lazy=True))
    created_at = db.Column(db.DateTime, nullable=False,
        default=datetime.utcnow)

    def __repr__(self):
        return '<Event{}>'.format(self.type)
