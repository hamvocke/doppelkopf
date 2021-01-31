from flask import Blueprint, jsonify, request, abort

from .db import db
from .game import Game, Player
from .toggles import Toggle

blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/")
def hello() -> str:
    return "Healthy"


@blueprint.route("/game", methods=["POST"])
@blueprint.route(
    "/game/new", methods=["POST"]
)  # TODO remove this one, introduce a new endpoint just for metrics
def new_game():
    game = Game()
    db.session.add(game)
    db.session.commit()

    return jsonify({"game": game.serialize()}), 201


@blueprint.route("/game/<int:game_id>/join", methods=["POST"])
def join_game(game_id: int):
    data = request.json

    if data is None:
        abort(400)

    player = data.get("player")

    if player is None:
        abort(400)

    game = Game.query.get_or_404(game_id)
    game.players.append(Player(name=player["name"]))

    db.session.add(game)
    db.session.commit()

    return jsonify({"game": game.serialize()})


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = Toggle.query.all()

    mergedToggles = {}

    for toggle in toggles:
        mergedToggles.update(toggle.serialize())

    return jsonify({"features": mergedToggles})
