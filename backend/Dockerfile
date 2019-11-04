FROM python:3.7.5-alpine3.10

COPY . /app
WORKDIR /app

RUN pip install pipenv && pipenv install --system

EXPOSE 5000

ENV FLASK_ENV=production
ENV APP_PROFILE=doppelkopf.config.ProductionConfig
ENV FLASK_APP=doppelkopf
ENV DB_URI=sqlite:///app/db.sqlite

CMD make upgrade_db_prod && make run_prod
