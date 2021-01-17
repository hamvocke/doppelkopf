import copy
from datetime import datetime

from .db import db
from .helpers import pretty_date


class Toggle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    description = db.Column(db.String(256))
    enabled = db.Column(db.Boolean, nullable=False, default=False)
    last_changed_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"<Toggle: {self.name},{self.enabled}>"

    def __eq__(self, other):
        if not isinstance(other, Toggle):
            return NotImplemented

        return self.name == other.name and self.enabled == other.enabled

    def serialize(self):
        return {self.name: self.enabled}

    @staticmethod
    def insert_all():
        for toggle in toggles:
            if Toggle.query.get(toggle.id) is None:
                print(f"Creating toggle: {toggle.name}")
                db.session.add(toggle)

        db.session.commit()

    def last_changed(self) -> str:
        return pretty_date(self.last_changed_at)

    def toggle(self):
        self.enabled = not self.enabled
        self.last_changed_at = datetime.utcnow()


toggles = [
    Toggle(id=1, name="game.tutorial.enable", description="Aktiviert das Tutorial",),
    Toggle(id=2, name="game.announcements.enable", description="Aktiviert 'Ansagen'",),
    Toggle(id=3, name="game.multiplayer.enable", description="Aktiviert den Multiplayer-Modus",),
]
