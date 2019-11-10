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
        return {"id": self.id, "name": self.name, "enabled": self.enabled}

    @staticmethod
    def merge(persisted_toggles: list, code_toggles: list) -> list:
        persisted_dict = {t.name: t for t in persisted_toggles}
        code_dict = {t.name: t for t in code_toggles}
        merged_toggles = copy.deepcopy(code_dict)
        for key in code_dict:
            if key in persisted_dict:
                merged_toggles[key].enabled = persisted_dict[key].enabled

        return list(merged_toggles.values())

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
    Toggle(
        id=1,
        name="game.rules.karlchen",
        description="Aktiviert die 'Karlchen' Spielregel",
    ),
    Toggle(
        id=2,
        name="game.rules.fuchs",
        description="Aktiviert die 'Fuchs gefangen' Spielregel",
    ),
    Toggle(
        id=3,
        name="game.rules.scharf",
        description="Wenn aktiv, werden 9er aus dem Spiel entfernt",
    ),
    Toggle(
        id=4,
        name="game.rules.zweite_dulle",
        description="Aktiviert die 'zweite Dulle schlaegt die erste' Spielregel",
    ),
]
