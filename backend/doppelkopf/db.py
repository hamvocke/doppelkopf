import click
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import doppelkopf

db = SQLAlchemy()
migrate = Migrate()


@click.command("seed-data")
@with_appcontext
def seed_data_command():
    doppelkopf.events.EventType.insert_all()
    doppelkopf.toggles.Toggle.insert_all()
    click.echo("Initialized seed data.")


def init_app(app):
    db.init_app(app)
    migrate.init_app(app, db)
    app.cli.add_command(seed_data_command)
