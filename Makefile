format:
	pipenv run black backend/ --exclude "/(\.git|\.mypy_cache|\.venv||build|dist|node_modules)/"

run:
	export FLASK_ENV=development && \
	export APP_PROFILE=backend.config.DevelopmentConfig && \
	export FLASK_APP=backend && \
	pipenv run flask run


init-db:
	export FLASK_ENV=development && \
	export APP_PROFILE=backend.config.DevelopmentConfig && \
	export FLASK_APP=backend && \
	pipenv run flask init-db

run_prod:
	export FLASK_ENV=production && \
	export APP_PROFILE=backend.config.ProductionConfig && \
	export FLASK_APP=backend && \
	pipenv run gunicorn --workers=2 backend:app -b :5000

unit:
	pipenv run pytest

mypy:
	pipenv run mypy backend/

flake8:
	pipenv run flake8 backend/

serve-frontend:
	pushd frontend && yarn serve && popd
