from doppelkopf.toggles import Toggle
from doppelkopf.db import db


def test_should_have_index_endpoint(client):
    response = client.get("/admin")
    assert response.status_code == 200

def test_should_have_toggles_endpoint(client):
    response = client.get("/admin/toggles")
    assert response.status_code == 200


def test_should_render_toggles_from_db(client):
    toggle = Toggle(name="some-toggle", enabled=True)
    db.session.add(toggle)
    db.session.commit()

    response = client.get("/admin/toggles")
    assert b"some-toggle" in response.data
