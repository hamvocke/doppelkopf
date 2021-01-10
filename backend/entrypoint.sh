#! /usr/bin/env sh

pipenv run flask db upgrade
pipenv run flask seed-data
exec pipenv run gunicorn --workers=2 "doppelkopf:create_app()" -b :5000
