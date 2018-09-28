from backend import app

app = app.test_client()


def test_index():
    response = app.get("/")
    assert response.status_code == 200
