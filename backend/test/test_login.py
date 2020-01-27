import doppelkopf.login


def test_should_load_existing_user():
    user = doppelkopf.login.load_user("admin")
    assert user.id == "admin"


def test_should_return_none_if_user_does_not_exist():
    user = doppelkopf.login.load_user("someone")
    assert user is None


def test_should_have_login_endpoint(client):
    response = client.get("/admin/login")
    assert response.status_code == 200


def test_should_login_user(client):
    response = client.post("/admin/login", data={"email": "admin", "password": "totally-secret"})
    assert response.status_code == 302


def test_should_not_login_unknown_user(client):
    response = client.post("/admin/login", data={"email": "someone", "password": "something"})
    assert response.status_code == 200
    assert b"You didn&#39;t say the magic word" in response.data


def test_should_not_login_with_invalid_password(client):
    response = client.post("/admin/login", data={"email": "admin", "password": "something"})
    assert response.status_code == 200
    assert b"You didn&#39;t say the magic word" in response.data


def test_should_logout_user(client):
    with client:
        client.post("/admin/login", data={"email": "admin", "password": "totally-secret"})
        response = client.get("/admin/logout")
    assert response.status_code == 200
    assert b"Logged out" in response.data
