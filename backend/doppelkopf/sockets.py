from flask_socketio import SocketIO

socketio = SocketIO()


def init_app(app):
    socketio.init_app(app, cors_allowed_origins=app.config["CORS_ALLOWED_ORIGINS"])
