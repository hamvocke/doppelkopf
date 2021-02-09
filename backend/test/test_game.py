from doppelkopf.game import Player, Game


def test_serialize_game():
    players = [Player(id=1, name="some player"), Player(id=2, name="another player")]
    game = Game(id=1, players=players)

    expected_serialization = {
        "id": 1,
        "players": [{"name": "some player"}, {"name": "another player"}],
    }
    assert game.serialize() == expected_serialization
