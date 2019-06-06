import os

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = "someSecretKey"
    SENTRY_DSN = "someSentryDsn"
    INFLUXDB_HOST = "localhost"
    INFLUXDB_PATH = "/influx"
    INFLUXDB_USER = "user"
    INFLUXDB_PASS = "pass"
    INFLUXDB_DB = "doppelkopf"
    DATABASE = "sqlite:///memory"


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    SENTRY_DSN = os.environ.get("SENTRY_DSN", Config.SENTRY_DSN)
    SECRET_KEY = os.environ.get("SECRET_KEY", Config.SECRET_KEY)
    INFLUXDB_HOST = os.environ.get("INFLUXDB_HOST", Config.INFLUXDB_HOST)
    INFLUXDB_USER = os.environ.get("INFLUXDB_USER", Config.INFLUXDB_USER)
    INFLUXDB_PASS = os.environ.get("INFLUXDB_PASS", Config.INFLUXDB_PASS)


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
