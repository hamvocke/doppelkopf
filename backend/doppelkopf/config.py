import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    ENV_NAME = "unknown"
    DEBUG = False
    TESTING = False
    SECRET_KEY = "someSecretKey"
    SENTRY_DSN = "someSentryDsn"
    INFLUXDB_HOST = "localhost"
    INFLUXDB_PATH = "/influx"
    INFLUXDB_USER = "user"
    INFLUXDB_PASS = "pass"
    INFLUXDB_DB = "doppelkopf"
    SQLALCHEMY_DATABASE_URI = "sqlite://"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    ENV_NAME = "prod"
    DEBUG = False
    TESTING = False
    SENTRY_DSN = os.environ.get("SENTRY_DSN", Config.SENTRY_DSN)
    SECRET_KEY = os.environ.get("SECRET_KEY", Config.SECRET_KEY)
    INFLUXDB_HOST = os.environ.get("INFLUXDB_HOST", Config.INFLUXDB_HOST)
    INFLUXDB_USER = os.environ.get("INFLUXDB_USER", Config.INFLUXDB_USER)
    INFLUXDB_PASS = os.environ.get("INFLUXDB_PASS", Config.INFLUXDB_PASS)
    SQLALCHEMY_DATABASE_URI = os.environ.get("DB_URI", "sqlite:////app/db.sqlite")  # defined in docker-compose.yml


class DevelopmentConfig(Config):
    ENV_NAME = "dev"
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "database-dev.sqlite")
    DEBUG = True


class TestingConfig(Config):
    ENV_NAME = "test"
    DEBUG = True
    TESTING = True
