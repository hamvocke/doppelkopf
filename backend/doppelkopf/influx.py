import click
from flask import current_app, g
from flask.cli import with_appcontext
from influxdb import InfluxDBClient


def get_influx():
    if "influx" not in g:
        g.influx = InfluxDBClient(
            host=current_app.config["INFLUXDB_HOST"],
            path=current_app.config["INFLUXDB_PATH"],
            port=443,
            database=current_app.config["INFLUXDB_DB"],
            username=current_app.config["INFLUXDB_USER"],
            password=current_app.config["INFLUXDB_PASS"],
            ssl=True,
            verify_ssl=True,
        )

    return g.influx


def create_database():
    get_influx().create_database("doppelkopf")


def send(name: str):
    get_influx().write(
        data="{} value=1".format(name),
        protocol="line",
    )


def close_influx(e=None):
    influx = g.pop("influx", None)

    if influx is not None:
        influx.close()


@click.command("init-influx")
@with_appcontext
def init_influx_command():
    """Clear the existing data and create new tables."""
    create_database()
    click.echo("Initialized influx database.")


def init_app(app):
    app.teardown_appcontext(close_influx)
    app.cli.add_command(init_influx_command)
