from unittest import mock

from backend import metrics

@mock.patch('backend.metrics.influx')
def test_send_metrics(mocked_influx):
    metrics.send("foo")

    mocked_influx.write.assert_called_once_with(data="foo value=1", params={"db": "doppelkopf"}, protocol="line")
