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
