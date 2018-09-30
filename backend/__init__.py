from flask import Flask  # type: ignore

app = Flask(__name__)

import backend.api  # noqa: E402, F401
