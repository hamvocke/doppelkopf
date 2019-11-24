from doppelkopf.events import Event, Game
from doppelkopf.db import db


def test_save_event(app):
    game = Game()
    db.session.add(game)
    db.session.commit()

    start_game = Event(event_type_id=1, game_id=game.id)
    db.session.add(start_game)
    db.session.commit()

    events = Event.query.all()

    assert events[0].event_type_id == 1
