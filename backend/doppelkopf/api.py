from flask import Blueprint, jsonify, request, abort

from .db import db
from .events import Event, EventTypes
from .game import Game
from .toggles import Toggle

blueprint = Blueprint("api", __name__, url_prefix="/api")

poorMansState = {}


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

    poorMansState[game.id] = {"players": []}

    return jsonify({"game_id": game.id}), 201


@blueprint.route("/game/<int:game_id>/join", methods=["POST"])
def join_game(game_id: int):
    data = request.json

    if data is None:
        abort(400)

    player = data.get("player")

    if player is None:
        abort(400)

    game = Game.query.get_or_404(game_id)

    poorMansState[game_id]["players"].append({"name": player["name"]})

    return jsonify({"gameId": game.id, "players": poorMansState[game_id]["players"]})


@blueprint.route("/game/<int:game_id>/win", methods=["POST"])
def win_game(game_id: int):
    return save_game_event(game_id, EventTypes.GAME_WIN)


@blueprint.route("/game/<int:game_id>/lose", methods=["POST"])
def lose_game(game_id: int):
    return save_game_event(game_id, EventTypes.GAME_LOSE)


@blueprint.route("/cron/db-backup", methods=["POST"])
def cron_db_backup():
    event = Event(event_type=EventTypes.CRON_DB_BACKUP)
    db.session.add(event)
    db.session.commit()

    return "Ok"


def save_game_event(game_id: int, type: EventTypes):
    game = Game.query.get_or_404(game_id)
    event = Event(event_type=type, game_id=game.id)
    db.session.add(event)
    db.session.commit()

    return "Created", 201


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = Toggle.query.all()

    mergedToggles = {}

    for toggle in toggles:
        mergedToggles.update(toggle.serialize())

    return jsonify({"features": mergedToggles})
