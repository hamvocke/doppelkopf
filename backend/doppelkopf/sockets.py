from flask_socketio import SocketIO

sockets = SocketIO()


def init_app(app):
    sockets.init_app(app)
