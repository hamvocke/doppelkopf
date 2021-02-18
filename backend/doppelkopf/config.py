import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    ENV_NAME = "unknown"
    DEBUG = False
    TESTING = False
    SECRET_KEY = "someSecretKey"
    SENTRY_DSN = None
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_ORIGINS = "*"


class ProductionConfig(Config):
    ENV_NAME = "prod"
    DEBUG = False
    TESTING = False
    SENTRY_DSN = os.environ.get("SENTRY_DSN", Config.SENTRY_DSN)
    SECRET_KEY = os.environ.get("SECRET_KEY", Config.SECRET_KEY)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DB_URI", "sqlite:////app/db/db.sqlite"
    )  # defined in docker-compose.yml
    CORS_ALLOWED_ORIGINS = ["https://doppelkopf.ham.codes"]


class DevelopmentConfig(Config):
    ENV_NAME = "dev"
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(
        basedir, "database-dev.sqlite"
    )
    DEBUG = True


class TestingConfig(Config):
    ENV_NAME = "test"
    DEBUG = True
    TESTING = True
