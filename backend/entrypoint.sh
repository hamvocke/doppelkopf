#! /usr/bin/env sh

pipenv run flask db upgrade
pipenv run flask seed-data
exec pipenv run gunicorn --worker-class eventlet --workers=1 "doppelkopf:create_app()" -b :5000
