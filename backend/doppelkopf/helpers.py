import datetime


def pretty_date(d: datetime.datetime) -> str:
    diff = datetime.datetime.utcnow() - d
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
