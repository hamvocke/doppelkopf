from unittest import mock

from doppelkopf import metrics


@mock.patch("doppelkopf.metrics.get_influx")
def test_create_database(mocked_influx):
    metrics.create_database()
    mocked_influx.return_value.create_database.assert_called_once_with("doppelkopf")


@mock.patch("doppelkopf.metrics.get_influx")
def test_send_metrics(mocked_influx):
    metrics.send("foo")
    mocked_influx.return_value.write.assert_called_once_with(
        data="foo value=1", protocol="line"
    )


def test_init_influx_command(runner, monkeypatch):
    class Recorder(object):
        called = False

    def fake_create_database():
        Recorder.called = True

    monkeypatch.setattr("doppelkopf.metrics.create_database", fake_create_database)
    result = runner.invoke(args=["init-influx"])
    assert "Initialized" in result.output
    assert Recorder.called
