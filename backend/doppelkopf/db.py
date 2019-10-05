import click
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import doppelkopf

db = SQLAlchemy()
migrate = Migrate()


def init_db():
    db.create_all()


@click.command("init-db")
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    doppelkopf.events.EventType.insert_all()
    click.echo("Initialized the database.")


def init_app(app):
    db.init_app(app)
    migrate.init_app(app, db)
    app.cli.add_command(init_db_command)
