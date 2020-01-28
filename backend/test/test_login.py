import doppelkopf.login
from doppelkopf.users import User


def test_should_return_none_if_user_does_not_exist(app):
    user = doppelkopf.login.load_user_by_name("someone")
    assert user is None


def test_should_have_login_endpoint(client):
    response = client.get("/admin/login")
    assert response.status_code == 200


def test_should_login_user(user, client):
    response = client.post(
        "/admin/login", data={"name": user.username, "password": "password"}
    )
    assert response.status_code == 302


def test_should_not_login_unknown_user(user, client):
    response = client.post(
        "/admin/login", data={"name": "someone", "password": "something"}
    )
    assert response.status_code == 200
    assert b"You didn&#39;t say the magic word" in response.data


def test_should_not_login_with_invalid_password(user, client):
    response = client.post(
        "/admin/login", data={"name": user.username, "password": "something"}
    )
    assert response.status_code == 200
    assert b"You didn&#39;t say the magic word" in response.data


def test_should_logout_user(user, client):
    with client:
        client.post(
            "/admin/login", data={"name": user.username, "password": "password"}
        )
        response = client.get("/admin/logout")
    assert response.status_code == 200
    assert b"Logged out" in response.data


def test_should_not_create_user_with_missing_parameters(runner):
    result = runner.invoke(
        doppelkopf.login.create_user_command, ["--username", "test-cli"]
    )
    assert "Error: Must provide username and password" in result.output


def test_create_user(runner):
    result = runner.invoke(
        doppelkopf.login.create_user_command,
        ["--username", "test-cli", "--password", "password"],
    )

    user = User.query.filter(User.username == "test-cli").first()
    assert "Created user test-cli" in result.output
    assert user is not None
