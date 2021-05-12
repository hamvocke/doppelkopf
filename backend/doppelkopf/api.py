from flask import Blueprint, jsonify, request, abort

from .db import db
from .game import Game, Player
from .toggles import Toggle

blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/")
def hello() -> str:
    return "Healthy"


@blueprint.route("/game", methods=["POST"])
def new_game():
    game = Game()
    db.session.add(game)
    db.session.commit()

    return jsonify({"game": game.serialize()}), 201


@blueprint.route("/game/<int:game_id>", methods=["GET"])
def get_game(game_id: int):
    game = Game.query.get_or_404(game_id)
    return jsonify({"game": game.serialize()})


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = Toggle.query.all()

    mergedToggles = {}

    for toggle in toggles:
        mergedToggles.update(toggle.serialize())

    return jsonify({"features": mergedToggles})
