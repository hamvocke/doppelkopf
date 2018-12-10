import os

from flask import Flask  # type: ignore

app = Flask(__name__)
app.config.from_object(
    os.environ.get("APP_PROFILE", "backend.config.DevelopmentConfig"))

app.logger.debug("using config: {}".format(app.config))

import backend.api  # noqa: E402, F401
