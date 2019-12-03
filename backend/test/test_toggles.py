from doppelkopf.toggles import Toggle

from datetime import datetime, timedelta

toggles_from_db = [
    Toggle(name="db-only", enabled=False),
    Toggle(name="db-and-code", enabled=True),
]

toggles_from_code = [
    Toggle(name="code-only", enabled=False),
    Toggle(name="db-and-code", enabled=False),
]


def test_merge_toggles():
    merged = Toggle.merge(toggles_from_db, toggles_from_code)

    code_and_db = Toggle(
        name="db-and-code",
        description="a toggle thats defined in code and database",
        enabled=True,
    )
    code_only = Toggle(
        name="code-only",
        description="a toggle thats only defined in code",
        enabled=False,
    )

    assert code_and_db in merged
    assert code_only in merged
    assert len(merged) == 2


def test_serialize():
    toggle = Toggle(id=1, name="some", enabled=True, description="some description")

    expected_serialization = {"id": 1, "name": "some", "enabled": True}
    assert toggle.serialize() == expected_serialization


def test_update_toggle_state():
    last_changed = datetime.utcnow() - timedelta(days=2)
    t = Toggle(name="some-toggle", enabled=False, last_changed_at=last_changed)

    t.toggle()

    assert t.enabled is True
    assert t.last_changed_at > datetime.utcnow() - timedelta(seconds=2)
