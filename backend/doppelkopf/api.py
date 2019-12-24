from flask import Blueprint, jsonify

from .db import db
from .events import Event, EventTypes, Game
from .toggles import Toggle

blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/")
def hello() -> str:
    return "Healthy"


@blueprint.route("/game/new", methods=["POST"])
def new_game():
    game = Game()
    db.session.add(game)
    db.session.commit()

    event = Event(event_type=EventTypes.GAME_START, game_id=game.id)
    db.session.add(event)
    db.session.commit()

    return jsonify({"game_id": game.id}), 201


@blueprint.route("/game/<int:game_id>/win", methods=["POST"])
def win_game(game_id: int):
    return save_game_event(game_id, EventTypes.GAME_WIN)


@blueprint.route("/game/<int:game_id>/lose", methods=["POST"])
def lose_game(game_id: int):
    return save_game_event(game_id, EventTypes.GAME_LOSE)


def save_game_event(game_id: int, type: EventTypes):
    game = Game.query.get_or_404(game_id)
    event = Event(event_type=type, game_id=game.id)
    db.session.add(event)
    db.session.commit()

    return "Created", 201


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = {t.name: t.serialize() for t in Toggle.query.all()}

    return jsonify({"features": toggles})
