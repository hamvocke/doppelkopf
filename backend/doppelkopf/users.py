from datetime import datetime

from flask_login import UserMixin

import doppelkopf
from .db import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(32), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    password_hash = db.Column(db.String(256), nullable=False)

    def __repr__(self) -> str:
        return f"<User: {self.id}, {self.username}>"

    def get_id(self) -> str:
        return str(self.id)

    def is_correct_password(self, plaintext: str) -> bool:
        return doppelkopf.login.crypt.check_password_hash(self.password_hash, plaintext)
