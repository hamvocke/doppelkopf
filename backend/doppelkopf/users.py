from doppelkopf.db import db

users = {"admin": {"password": "totally-secret"}}


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True)

    def __repr__(self) -> str:
        return f"<User: {self.id}>"

    def is_authenticated(self) -> bool:
        return True

    def is_active(self) -> bool:
        return True

    def is_anonymous(self) -> bool:
        return False

    def get_id(self) -> str:
        return self.id
