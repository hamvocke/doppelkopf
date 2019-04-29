import os

from flask import Flask  # type: ignore
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from influxdb import InfluxDBClient
from . import admin
from . import db

sentry_sdk.init(
    dsn="https://103f1e1585fc47efb1b56a24db8b9dcc@sentry.io/1449084",
    integrations=[FlaskIntegration()]
)

app = Flask(__name__)
app.config.from_object(
    os.environ.get("APP_PROFILE", "backend.config.DevelopmentConfig")
)

print("config dump")
print(app.config["INFLUXDB_HOST"])
print(app.config["INFLUXDB_USER"])
print(app.config["INFLUXDB_PASS"])

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
