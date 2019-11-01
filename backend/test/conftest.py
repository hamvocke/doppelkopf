import pytest

from doppelkopf import create_app, db


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
def runner(app):
    return app.test_cli_runner()
