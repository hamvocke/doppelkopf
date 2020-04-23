import datetime
from typing import Optional
from urllib.parse import urlsplit


def pretty_date(d: datetime.datetime, now: Optional[datetime.datetime] = None) -> str:
    n = now.utcnow() if now is not None else datetime.datetime.utcnow()
    diff = n - d
    seconds = diff.seconds
    if diff.days > 7 or diff.days < 0:
        return d.strftime("%d %b %y")
    elif diff.days == 1:
        return "1 day ago"
    elif diff.days > 1:
        return f"{diff.days} days ago"
    elif seconds <= 1:
        return "just now"
    elif seconds < 60:
        return f"{int(seconds)} seconds ago"
    elif seconds < 120:
        return "1 minute ago"
    elif seconds < 3600:
        return f"{int(seconds/60)} minutes ago"
    elif seconds < 7200:
        return "1 hour ago"
    else:
        return f"{int(seconds/3600)} hours ago"


def is_safe_url(url: str) -> bool:
    if url is None:
        return True

    u = urlsplit(url, scheme="https")

    if u.scheme != "http" and u.scheme != "https":
        return False

    if u.netloc != "":  # only relative URLs
        return False

    return True
