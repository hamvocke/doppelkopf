from doppelkopf.game import Player, Game
import pytest


def test_serialize_game():
    players = [Player(id=1, name="some player"), Player(id=2, name="another player")]
    game = Game(id=1, players=players)

    expected_serialization = {
        "id": 1,
        "players": [
            {
                "id": 1,
                "name": "some player"
            },
            {
                "id": 2,
                "name": "another player"
            }
        ],
    }
    assert game.serialize() == expected_serialization

def test_should_join_game():
    player = Player(id=1, name="some player")
    game = Game(id=1)

    game.join(player)

    assert game.players == [player]

def test_should_not_join_if_game_has_4_players():
    game = Game(id=1)

    game.join(Player(id=1, name="some"))
    game.join(Player(id=2, name="some"))
    game.join(Player(id=3, name="some"))
    game.join(Player(id=4, name="some"))

    with pytest.raises(Exception):
        game.join(Player(id=5, name="some"))
