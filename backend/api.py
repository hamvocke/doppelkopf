from backend import app


@app.route("/")
def hello() -> str:
    return "Hello World!"
