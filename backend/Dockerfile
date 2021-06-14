FROM python:3.9.5-alpine3.13

# TODO: Run css generation

COPY . /app
WORKDIR /app

RUN apk add --no-cache --virtual build-deps build-base gcc libffi libffi-dev
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

EXPOSE 5000

ENV FLASK_ENV=production
ENV APP_PROFILE=doppelkopf.config.ProductionConfig
ENV FLASK_APP=doppelkopf
ENV DB_URI=sqlite:////app/db/db.sqlite

RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
