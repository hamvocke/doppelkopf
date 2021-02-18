from flask_socketio import SocketIO
from flask import current_app

socketio = SocketIO()


def init_app(app):
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"])


@socketio.on("connect")
def on_connect():
    current_app.logger.info("someone connected")
