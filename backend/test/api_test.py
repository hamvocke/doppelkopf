from .. import app

app = app.test_client()


def test_index():
    response = app.get("/")
    assert response.status_code == 200
    assert b'Hello World' in response.data


def test_start_game():
    response = app.post("/game/new")
    assert response.status_code == 201
    assert b'Registered new game' in response.data
