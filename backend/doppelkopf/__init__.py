import os
import sys
import logging

from flask import Flask  # type: ignore
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from flask_cors import CORS


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load config, if it exists, when not testing
        app.config.from_object(
            os.environ.get("APP_PROFILE", "doppelkopf.config.DevelopmentConfig")
        )
    else:
        # load the test config
        app.config.from_object("doppelkopf.config.TestingConfig")
        app.config.update(test_config)

    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.INFO)

    if not app.config["DEBUG"]:
        if not app.config["SENTRY_DSN"]:
            app.logger.warning("No Sentry DSN found, skipping Sentry setup")
        else:
            sentry_sdk.init(
                dsn=app.config["SENTRY_DSN"],
                environment=app.config["ENV_NAME"],
                integrations=[FlaskIntegration(), SqlalchemyIntegration()],
            )

    CORS(app, origins=app.config["CORS_ALLOWED_ORIGINS"])

    from doppelkopf import sockets

    sockets.init_app(app)

    from doppelkopf import login

    login.init_app(app)

    from doppelkopf import admin, api, metrics

    app.register_blueprint(admin.blueprint)
    app.register_blueprint(api.blueprint)
    app.register_blueprint(metrics.blueprint)

    from doppelkopf import db

    db.init_app(app)

    return app
