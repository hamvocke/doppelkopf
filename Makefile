format:
	pipenv run black . --exclude "/(\.git|\.mypy_cache|\.venv||build|dist|node_modules)/"

run:
	export FLASK_APP=backend/__init__.py && pipenv run flask run

unit:
	pipenv run pytest

mypy:
	pipenv run mypy .

flake8:
	pipenv run flake8 .

serve-frontend:
	pushd frontend && yarn serve && popd
