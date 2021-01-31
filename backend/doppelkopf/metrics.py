from flask import Blueprint

from .db import db
from .events import Event, EventTypes

blueprint = Blueprint("metrics", __name__, url_prefix="/api/metrics")


@blueprint.route("/game/singleplayer/start", methods=["POST"])
def new_game():
    return save_game_event(EventTypes.GAME_SINGLEPLAYER_START)


@blueprint.route("/game/singleplayer/win", methods=["POST"])
def win_game():
    return save_game_event(EventTypes.GAME_SINGLEPLAYER_WIN)


@blueprint.route("/game/singleplayer/lose", methods=["POST"])
def lose_game():
    return save_game_event(EventTypes.GAME_SINGLEPLAYER_LOSE)


@blueprint.route("/cron/db-backup", methods=["POST"])
def cron_db_backup():
    event = Event(event_type=EventTypes.CRON_DB_BACKUP)
    db.session.add(event)
    db.session.commit()

    return "Ok"


def save_game_event(type: EventTypes):
    event = Event(event_type=type)
    db.session.add(event)
    db.session.commit()

    return "Created", 201
