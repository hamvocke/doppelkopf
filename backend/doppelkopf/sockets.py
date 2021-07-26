from typing import Dict
from flask_socketio import SocketIO, emit, join_room
from flask import request
from .game import Game, Player
from .db import db
import json
import datetime
import uuid

socketio = SocketIO()


def init_app(app):
    socketio.init_app(
        app,
        cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"],
        logger=app.config["DEBUG"],
        engineio_logger=False,
    )


session_lookup: Dict[str, str] = {}


def find_session_id(sid):
    return session_lookup.get(sid, None)


@socketio.on("connect")
def on_connect(auth):
    print(auth)
    if auth is None:
        session_id = uuid.uuid4()
    else:
        session_id = auth.get("sessionId")

    session_lookup[request.sid] = session_id
    emit("session", json.dumps({"sessionId": str(session_id)}), broadcast=True)

    player = Player.query.filter_by(session_id=session_id).first()

    if player is not None:
        game = Game.query.get(player.game_id)
        player.session_id = session_id
        db.session.add(player)
        db.session.commit()
        join_room(str(game.id))
        emit("joined", json.dumps({"game": game.serialize()}), to=str(game.id))


@socketio.on("join")
def on_join(data):
    # TODO: validate data - use marshmallow?
    game_id = data["game"]["id"]
    game = Game.query.get(game_id)

    if game is None:
        emit("error", f"Game with id {game_id} not found")
        return

    player = None
    session_id = find_session_id(request.sid)
    player = Player.query.filter_by(session_id=session_id).first()
    if player is None:
        player = Player(name=data["player"]["name"], session_id=session_id)
        try:
            game.join(player)
            db.session.add(game)
            db.session.commit()
            join_room(str(game.id))
            emit("joined", json.dumps({"game": game.serialize()}), to=str(game.id))
        except Exception:
            emit("error", "error-room-full")
            return


@socketio.on("disconnect")
def on_disconnect():
    session_id = find_session_id(request.sid)
    player = Player.query.filter_by(session_id=session_id).first()
    if player is None:
        emit("error", f"Player with session id {session_id} not found")
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
