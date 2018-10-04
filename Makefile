format:
	pipenv run black . --exclude build/|buck-out/|dist/|_build/|\.git/|\.hg/|\.mypy_cache/|\.nox/|\.tox/|\.venv/|node_modules

run:
	export FLASK_APP=backend/__init__.py && pipenv run flask run

unit:
	pipenv run pytest

mypy:
	pipenv run mypy .

flake8:
	pipenv run flake8 .
