from doppelkopf.db import db


class Toggle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True)
    enabled = db.Column(db.Boolean)

    def __repr__(self):
        return '<Toggle{},{}>'.format(self.name, self.enabled)
