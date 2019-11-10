from flask import Blueprint, jsonify

from .db import db
from .events import Event, EventTypes
from .toggles import Toggle

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


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = [t.serialize() for t in Toggle.query.all()]

    return jsonify({"features": toggles})
