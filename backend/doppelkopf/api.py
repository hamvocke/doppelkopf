from doppelkopf.events import Event, EventTypes
from doppelkopf.db import db
from flask import Blueprint

blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/")
def hello() -> str:
    return "Healthy"


@blueprint.route("/game/new", methods=["POST"])
def new_game():
    event = Event(event_type_id=EventTypes.GAME_START)
    db.session.add(event)
    db.session.commit()

    return "Registered new game", 201

