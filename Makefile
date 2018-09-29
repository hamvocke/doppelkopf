format:
	pipenv run black .

run:
	export FLASK_APP=backend/__init__.py && pipenv run flask run

unit:
	pipenv run pytest

mypy:
	pipenv run mypy .
