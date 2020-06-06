.PHONY: install format run init_db run_prod test  mypy flake8 serve-frontend

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
	pipenv run flask run

seed_data:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask seed-data

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

run_prod:
	export FLASK_ENV=production && \
	export APP_PROFILE=doppelkopf.config.ProductionConfig && \
	export FLASK_APP=doppelkopf && \
	export DB_URI=sqlite:///tmp/doppelkopf_db.sqlite && \
	pipenv run flask db upgrade && \
	pipenv run flask db seed-data && \
	pipenv run gunicorn --workers=2 doppelkopf.wsgi:app -b :5000

test:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.TestingConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run pytest

# make create_user username=some-name password=some-password
create_user:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask create-user --username=$(username) --password=$(password)

mypy:
	pipenv run mypy .

flake8:
	pipenv run flake8 .

build_css:
	npx tailwind build doppelkopf/static/admin.css -o doppelkopf/static/style.css && \
	node_modules/purgecss/bin/purgecss --config ./purgecss.config.js -o doppelkopf/static
