from doppelkopf.toggles import Toggle
from doppelkopf.db import db


def test_should_have_index_endpoint(client):
    response = client.get("/admin/")
    assert response.status_code == 200


def test_should_have_toggles_endpoint(client):
    response = client.get("/admin/toggles")
    assert response.status_code == 200


def test_should_render_toggles_from_db(client):
    save_toggle("some-toggle")
    response = client.get("/admin/toggles")
    assert b"some-toggle" in response.data


def test_should_save_toggle_state(client):
    one = save_toggle("some-toggle", True)
    two = save_toggle("some-other-toggle", False)

    client.post("/admin/toggles/submit", data={two.id: 'on'})

    one = Toggle.query.get(one.id)
    two = Toggle.query.get(two.id)
    assert one.enabled is False
    assert two.enabled is True


def save_toggle(name="some-toggle", enabled=True) -> Toggle:
    toggle = Toggle(name=name, enabled=enabled)
    db.session.add(toggle)
    db.session.commit()
    return toggle
