from flask_socketio import SocketIO

socketio = SocketIO()


def init_app(app):
    socketio.init_app(app)
