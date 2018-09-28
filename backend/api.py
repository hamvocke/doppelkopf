from backend import app


@app.route("/")
def hello():
    return "Hello World!"
