FROM python:3.7-alpine3.7

COPY . /app
WORKDIR /app

RUN pip install pipenv && pipenv install --system

EXPOSE 5000

CMD gunicorn --workers=2 backend:app -b :5000
