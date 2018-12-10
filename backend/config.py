import os


class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "someSecretKey"
    SENTRY_DSN = "someSentryDsn"
    SERVER_NAME = "localhost:5001"


class ProductionConfig(Config):
    SENTRY_DSN = os.environ.get("SENTRY_DSN")
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SERVER_NAME = "doppelkopf.ham.codes"


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
