from flask_socketio import SocketIO, emit, join_room
from flask import current_app, request
from .game import Game, Player
from .db import db
import json

socketio = SocketIO()


def init_app(app):
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"])


@socketio.on("connect")
def on_connect():
    emit("connected")


@socketio.on("join")
def on_join(data):
    current_app.logger.info(f"someone joined, {data}")

    # payload = json.loads(data);
    payload = data
    # todo: validate payload - use marshmallow?
    player = Player(name=payload["player"]["name"], session_id=request.sid)
    game_id = payload["game"]["id"]

    game = Game.query.get(game_id)

    if game is None:
        emit("error", f"Game with id {game_id} not found")
        return

    game.join(player)

    db.session.add(game)
    db.session.commit()

    join_room(game_id)
    current_app.logger.info(f"{player.name} joined room for {game_id}")
    emit("joined", json.dumps({ "game": game.serialize() }))

