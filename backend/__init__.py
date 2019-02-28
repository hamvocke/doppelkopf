import os

from flask import Flask  # type: ignore
from influxdb import InfluxDBClient
from . import admin
from . import db

app = Flask(__name__)
app.config.from_object(
    os.environ.get("APP_PROFILE", "backend.config.DevelopmentConfig")
)

app.register_blueprint(admin.blueprint)

db.init_app(app)

influx = InfluxDBClient(
    host=app.config["INFLUXDB_HOST"],
    path=app.config["INFLUXDB_PATH"],
    port=443,
    database=app.config["INFLUXDB_DB"],
    username=app.config["INFLUXDB_USER"],
    password=app.config["INFLUXDB_PASS"],
    ssl=True,
    verify_ssl=True,
)


import backend.api  # noqa: E402, F401
