.PHONY: install format run init_db test mypy flake8 serve-frontend

install:
	pipenv install --dev

format:
	pipenv run black . --exclude "/(\.git|\.mypy_cache|\.venv|build|dist|node_modules|migrations)/"

run:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask db upgrade && \
	pipenv run flask seed-data && \
	pipenv run python wsgi.py

seed_data:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask seed-data

db_init:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask db init

migrate:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask db migrate

upgrade_db:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask db upgrade

test:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.TestingConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run pytest

# make create_admin password=some-password
create_admin:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.ProductionConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask create-user --username=admin --password=$(password)

mypy:
	pipenv run mypy .

flake8:
	pipenv run flake8 .

build_css:
	NODE_ENV=production npx tailwindcss-cli build doppelkopf/static/admin.css -o doppelkopf/static/style.css
