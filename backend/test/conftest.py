import pytest

from doppelkopf import create_app, db, login
from doppelkopf.users import User
from doppelkopf.sockets import socketio


_pw_hash = ""


@pytest.fixture
def app():
    app = create_app()
    app_context = app.app_context()
    app_context.push()
    db.db.create_all()

    yield app

    db.db.session.remove()
    db.db.drop_all()
    app_context.pop()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def socket_client(app, client):
    test_client = socketio.test_client(app, flask_test_client=client)
    yield test_client
    test_client.disconnect()


@pytest.fixture
def user(app):
    global _pw_hash
    if not _pw_hash:
        _pw_hash = login.crypt.generate_password_hash("password", 10)
    user = User(username="test", password_hash=_pw_hash)
    db.db.session.add(user)
    db.db.session.commit()
    return user


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
