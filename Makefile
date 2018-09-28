format: 
	pipenv run black .

run:
	export FLASK_APP=doppelkopf/__init__.py && pipenv run flask run

unit:
	pipenv run pytest
