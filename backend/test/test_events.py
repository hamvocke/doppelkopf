from doppelkopf.events import Event, Game, EventTypes
from doppelkopf.db import db


def test_save_event(app):
    game = Game()
    db.session.add(game)
    db.session.commit()

    start_game = Event(event_type=EventTypes.GAME_WIN, game_id=game.id)
    db.session.add(start_game)
    db.session.commit()

    events = Event.query.all()

    assert events[0].event_type == EventTypes.GAME_WIN
