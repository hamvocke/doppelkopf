from flask import Blueprint, jsonify, request, abort, current_app

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

    response = jsonify({"game": game.serialize()})
    response.headers["Access-Control-Allow-Origin"] = current_app.config["CORS_ALLOWED_ORIGINS"][0]
    return response, 201


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

    response = jsonify({"game": game.serialize()})
    response.headers["Access-Control-Allow-Origin"] = current_app.config["CORS_ALLOWED_ORIGINS"][0]
    return response


@blueprint.route("/features", methods=["GET"])
def features():
    toggles = Toggle.query.all()

    mergedToggles = {}

    for toggle in toggles:
        mergedToggles.update(toggle.serialize())

    return jsonify({"features": mergedToggles})
