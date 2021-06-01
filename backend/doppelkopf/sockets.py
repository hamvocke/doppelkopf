from flask_socketio import SocketIO, emit, join_room
from flask import current_app, request
from .game import Game, Player
from .db import db
import json
import  datetime

socketio = SocketIO()


def init_app(app):
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"], logger=app.config["DEBUG"], engineio_logger=app.config["DEBUG"])


@socketio.on("connect")
def on_connect():
    emit("connected")


@socketio.on("join")
def on_join(data):
    # TODO: validate data - use marshmallow?
    # TODO: handle reconnect case
    game_id = data["game"]["id"]
    game = Game.query.get(game_id)

    if game is None:
        emit("error", f"Game with id {game_id} not found")
        return

    player = None
    player_id = data["player"].get("id", None)
    if player_id is not None:
        # reconnect!
        player = Player.query.get(player_id)
        player.session_id = request.sid
    else:
        player = Player(name=data["player"]["name"], session_id=request.sid)
        try:
            game.join(player)
        except Exception:
            emit("error", f"Can't join game {game_id}. Game has 4 players already.")
            return

    db.session.add(game)
    db.session.commit()
    join_room(game_id)
    emit("joined", json.dumps({"game": game.serialize()}), to=game_id)


@socketio.on("disconnect")
def on_disconnect():
    player = Player.query.filter_by(session_id=request.sid).first()
    if player is None:
        emit("error", f"Player with session id {request.sid} not found")
        return

    game = Game.query.get(player.game_id)
    if game.started_at is None:
        print("delete this shit")
        db.session.delete(player)
    else:
        player.disconnected_at = datetime.datetime.utcnow()
        db.session.add(player)

    db.session.commit()
    game = Game.query.get(player.game_id)

    emit("disconnected", json.dumps({"game": game.serialize()}), to=game.id)
