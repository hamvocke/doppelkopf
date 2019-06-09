FROM python:3.7-alpine3.7

COPY . /app
WORKDIR /app

RUN pip install pipenv && pipenv install --system

EXPOSE 5000

ENV APP_PROFILE=doppelkopf.config.ProductionConfig

CMD pipenv run gunicorn --workers=2 doppelkopf.wsgi:app -b :5000
