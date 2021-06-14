#! /usr/bin/env sh

flask db upgrade
flask seed-data
exec python wsgi.py
