import os

from flask import Flask  # type: ignore
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration


def create_app(test_config=None):
    sentry_sdk.init(
        dsn="https://103f1e1585fc47efb1b56a24db8b9dcc@sentry.io/1449084",
        integrations=[FlaskIntegration()]
    )

    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        # load config, if it exists, when not testing
        app.config.from_object(
            os.environ.get("APP_PROFILE", "doppelkopf.config.DevelopmentConfig")
        )
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    from . import admin, api
    app.register_blueprint(admin.blueprint)
    app.register_blueprint(api.blueprint)

    from . import influx
    influx.init_app(app)
    
    from . import db
    db.init_app(app)

    return app

