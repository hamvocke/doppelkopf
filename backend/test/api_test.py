from unittest import mock

from backend import app

app = app.test_client()


def set_up():
    app.config.from_object("config.TestingConfig")


def test_index():
    response = app.get("/")
    assert response.status_code == 200
    assert b"Hello World" in response.data


@mock.patch("backend.metrics.influx")
def test_start_game(mock_influx):
    response = app.post("/game/new")
    assert response.status_code == 201
    assert b"Registered new game" in response.data


@mock.patch("backend.metrics.influx")
def test_should_send_metrics_when_starting_a_game(mock_influx):
    app.post("/game/new")
    mock_influx.write.assert_called_once()
