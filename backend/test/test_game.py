from doppelkopf.game import Player

from datetime import datetime, timedelta


def test_serialize():
    toggle = Player(id=1, name="some player")

    expected_serialization = {"name": "some player"}
    assert toggle.serialize() == expected_serialization
