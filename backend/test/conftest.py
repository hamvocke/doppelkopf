import pytest

from doppelkopf import create_app
from doppelkopf.db import init_db


@pytest.fixture
def app():
    app = create_app()

    with app.app_context():
        init_db()

    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()
