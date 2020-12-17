from doppelkopf.toggles import Toggle

from datetime import datetime, timedelta


def test_serialize():
    toggle = Toggle(id=1, name="some", enabled=True, description="some description")

    expected_serialization = { "some": True}
    assert toggle.serialize() == expected_serialization


def test_update_toggle_state():
    last_changed = datetime.utcnow() - timedelta(days=2)
    t = Toggle(name="some-toggle", enabled=False, last_changed_at=last_changed)

    t.toggle()

    assert t.enabled is True
    assert t.last_changed_at > datetime.utcnow() - timedelta(seconds=2)
