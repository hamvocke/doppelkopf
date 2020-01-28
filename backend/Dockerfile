FROM python:3.7.5-alpine3.10

COPY . /app
WORKDIR /app

RUN apk add python python-dev py2-pip autoconf automake g++ make --no-cache
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

EXPOSE 5000

ENV FLASK_ENV=production
ENV APP_PROFILE=doppelkopf.config.ProductionConfig
ENV FLASK_APP=doppelkopf
ENV DB_URI=sqlite:////app/db/db.sqlite

RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
