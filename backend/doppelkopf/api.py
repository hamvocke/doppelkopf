from doppelkopf import metrics
from flask import Blueprint

blueprint = Blueprint("api", __name__, url_prefix="/api")


@blueprint.route("/")
def hello() -> str:
    return "Hello World!"


@blueprint.route("/game/new", methods=["POST"])
def new_game():
    if metrics.send("game"):
        return "Registered new game", 201
    else:
        return "Failed to register game", 200
