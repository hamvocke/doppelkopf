#! /usr/bin/env sh

pipenv run flask db upgrade
pipenv run flask seed-data
exec pipenv run python wsgi.py
