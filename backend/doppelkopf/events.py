from doppelkopf.db import db
from datetime import datetime


class EventType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)

    def __repr__(self):
        return '<EventType{}>'.format(self.name)


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
