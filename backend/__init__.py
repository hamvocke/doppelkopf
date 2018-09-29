from flask import Flask  # type: ignore

app = Flask(__name__)

import backend.api
