from doppelkopf import helpers
from datetime import datetime, timedelta


class TestPrettyDate:
    now = datetime.utcnow()

    def test_pretty_date_way_past(self):
        d = datetime(2019, 10, 1)
        past_date = d - timedelta(days=8)
        assert helpers.pretty_date(past_date) == "23 Sep 19"

    def test_pretty_date_three_days_ago(self):
        past_date = self.now - timedelta(days=3)
        assert helpers.pretty_date(past_date) == "3 days ago"

    def test_pretty_date_one_day_ago(self):
        past_date = self.now - timedelta(days=1)
        assert helpers.pretty_date(past_date) == "1 day ago"

    def test_pretty_date_10_hours_ago(self):
        past_date = self.now - timedelta(hours=10)
        assert helpers.pretty_date(past_date) == "10 hours ago"

    def test_pretty_date_1_hour_ago(self):
        past_date = self.now - timedelta(hours=1)
        assert helpers.pretty_date(past_date) == "1 hour ago"

    def test_pretty_date_minutes_ago(self):
        past_date = self.now - timedelta(minutes=12)
        assert helpers.pretty_date(past_date) == "12 minutes ago"

    def test_pretty_date_1_minute_ago(self):
        past_date = self.now - timedelta(minutes=1)
        assert helpers.pretty_date(past_date) == "1 minute ago"

    def test_pretty_date_seconds_ago(self):
        past_date = self.now - timedelta(seconds=29, milliseconds=500)
        assert helpers.pretty_date(past_date, self.now) == "30 seconds ago"

    def test_pretty_date_just_now(self):
        past_date = self.now - timedelta(milliseconds=300)
        assert helpers.pretty_date(past_date) == "just now"


class TestSafeUrl:
    def test_reject_hostname(self):
        assert helpers.is_safe_url("https://example.com/something/evil") is False

    def test_reject_javascript(self):
        assert helpers.is_safe_url("javascript:alert('foo')") is False

    def test_reject_file(self):
        assert helpers.is_safe_url("file:///usr/lib/foo") is False

    def test_reject_data(self):
        assert (
            helpers.is_safe_url(
                "data:text/html,<script>alert(document.domain)</script>"
            )
            is False
        )

    def test_allow_path(self):
        assert helpers.is_safe_url("/admin/") is True

    def test_allow_noneh(self):
        assert helpers.is_safe_url(None) is True
