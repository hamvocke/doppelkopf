from backend import app, metrics


@app.route("/")
def hello() -> str:
    return "Hello World!"


@app.route("/game/new", methods=["POST"])
def new_game():
    metrics.send("game")
    return "Registered new game", 201
