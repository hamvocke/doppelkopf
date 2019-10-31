from doppelkopf import helpers
from datetime import datetime, timedelta

now = datetime.utcnow()


def test_pretty_date_way_past():
    d = datetime(2019, 10, 1)
    past_date = d - timedelta(days=8)
    assert helpers.pretty_date(past_date) == "23 Sep 19"


def test_pretty_date_three_days_ago():
    past_date = now - timedelta(days=3)
    assert helpers.pretty_date(past_date) == "3 days ago"


def test_pretty_date_one_day_ago():
    past_date = now - timedelta(days=1)
    assert helpers.pretty_date(past_date) == "1 day ago"


def test_pretty_date_10_hours_ago():
    past_date = now - timedelta(hours=10)
    assert helpers.pretty_date(past_date) == "10 hours ago"


def test_pretty_date_1_hour_ago():
    past_date = now - timedelta(hours=1)
    assert helpers.pretty_date(past_date) == "1 hour ago"


def test_pretty_date_minutes_ago():
    past_date = now - timedelta(minutes=12)
    assert helpers.pretty_date(past_date) == "12 minutes ago"


def test_pretty_date_1_minute_ago():
    past_date = now - timedelta(minutes=1)
    assert helpers.pretty_date(past_date) == "1 minute ago"


def test_pretty_date_seconds_ago():
    past_date = now - timedelta(seconds=59)
    assert helpers.pretty_date(past_date) == "59 seconds ago"


def test_pretty_date_just_now():
    past_date = now - timedelta(milliseconds=300)
    assert helpers.pretty_date(past_date) == "just now"
