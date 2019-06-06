.PHONY: format run init_db run_prod test  mypy flake8 serve-frontend

format:
	pipenv run black . --exclude "/(\.git|\.mypy_cache|\.venv||build|dist|node_modules)/"

run:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask run


init_db:
	export FLASK_ENV=development && \
	export APP_PROFILE=doppelkopf.config.DevelopmentConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run flask init_db

run_prod:
	export FLASK_ENV=production && \
	export APP_PROFILE=doppelkopf.config.ProductionConfig && \
	export FLASK_APP=doppelkopf && \
	pipenv run gunicorn --workers=2 doppelkopf.wsgi:app -b :5000

test:
	pipenv run pytest

mypy:
	pipenv run mypy .

flake8:
	pipenv run flake8 .

