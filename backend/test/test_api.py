from unittest import mock


def test_index(client):
    response = client.get("/api/")
    assert response.status_code == 200
    assert b"Healthy" in response.data


@mock.patch("doppelkopf.metrics.send")
def test_should_send_metrics_when_starting_a_game(mock_metrics, client):
    mock_metrics.return_value = True
    response = client.post("/api/game/new")
    assert response.status_code == 201
    assert b"Registered new game" in response.data


@mock.patch("doppelkopf.metrics.send")
def test_should_report_when_metric_sending_fails(mock_metrics, client):
    mock_metrics.return_value = False
    response = client.post("/api/game/new")
    assert b"Failed to register game" in response.data
