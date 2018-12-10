from backend import app


@app.route("/")
def hello() -> str:
    return "Hello World!"


@app.route("/game/new", methods=['POST'])
def new_game() -> str:
    return "Registered new game", 201
