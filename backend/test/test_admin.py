from datetime import datetime, timedelta
from doppelkopf.toggles import Toggle
from doppelkopf.db import db


def test_admin_should_redirect_to_login(client):
    response = client.get("/admin/")
    assert response.status_code == 302


def test_toggles_should_redirect_to_login(client):
    response = client.get("/admin/toggles")
    assert response.status_code == 302


def test_should_render_stats_on_index(client):
    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        client.post("/api/game/new")
        response = client.get("/admin/")

    assert response.status_code == 200
    assert b"Games started" in response.data


def test_should_render_toggles_from_db(client):
    save_toggle("some-toggle")
    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        response = client.get("/admin/toggles")
    assert b"some-toggle" in response.data


def test_should_save_toggle_state(client):
    one = save_toggle("one", True)
    two = save_toggle("two", False)

    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        client.post("/admin/toggles/submit", data={two.id: "on"})

    one = Toggle.query.get(one.id)
    two = Toggle.query.get(two.id)
    assert one.enabled is False
    assert two.enabled is True


def test_should_update_last_changed_date_when_enabling(client):
    one = save_toggle("one", False)
    old_time = one.last_changed_at

    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        client.post("/admin/toggles/submit", data={one.id: "on"})

    new_time = Toggle.query.get(one.id).last_changed_at
    assert new_time > old_time


def test_should_update_last_changed_date_when_disabling(client):
    one = save_toggle("one", True)
    old_time = one.last_changed_at

    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        client.post("/admin/toggles/submit", data={})

    new_time = Toggle.query.get(one.id).last_changed_at
    assert new_time > old_time


def test_should_not_update_last_changed_date_when_state_is_not_changed(client):
    one = save_toggle("one", True)
    old_time = one.last_changed_at

    with client:
        client.post(
            "/admin/login", data={"email": "admin", "password": "totally-secret"}
        )
        client.post("/admin/toggles/submit", data={one.id: "on"})

    new_time = Toggle.query.get(one.id).last_changed_at
    assert new_time == old_time


def save_toggle(name="some-toggle", enabled=True) -> Toggle:
    toggle = Toggle(
        name=name,
        enabled=enabled,
        last_changed_at=datetime.utcnow() - timedelta(days=2),
    )
    db.session.add(toggle)
    db.session.commit()
    return toggle
