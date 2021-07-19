from flask_socketio import SocketIO, emit, join_room
from flask import request
from .game import Game, Player
from .db import db
import json
import datetime

socketio = SocketIO()


def init_app(app):
    socketio.init_app(
        app,
        cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"],
        logger=app.config["DEBUG"],
        engineio_logger=False,
    )


@socketio.on("connect")
def on_connect():
    emit("connected", broadcast=True)


@socketio.on("join")
def on_join(data):
    # TODO: validate data - use marshmallow?
    game_id = data["game"]["id"]
    game = Game.query.get(game_id)

    if game is None:
        emit("error", f"Game with id {game_id} not found")
        return

    player = None
    player_id = data["player"]["id"]
    player = Player.query.get(player_id)
    if player is not None:
        player.session_id = request.sid
    else:
        player = Player(name=data["player"]["name"], session_id=request.sid)
        try:
            game.join(player)
        except Exception:
            emit("error", "error-room-full")
            return

    db.session.add(game)
    db.session.commit()
    join_room(str(game.id))
    emit("joined", json.dumps({"game": game.serialize()}), to=str(game.id))


@socketio.on("disconnect")
def on_disconnect():
    player = Player.query.filter_by(session_id=request.sid).first()
    if player is None:
        emit("error", f"Player with session id {request.sid} not found")
        return

    game = Game.query.get(player.game_id)
    if game.started_at is None:
        db.session.delete(player)
    else:
        player.disconnected_at = datetime.datetime.utcnow()
        db.session.add(player)

    db.session.commit()
    game = Game.query.get(player.game_id)

    emit("left", json.dumps({"game": game.serialize()}), to=str(game.id))
