FROM node:alpine as frontend-builder

COPY . /frontend
WORKDIR /frontend

RUN yarn install
RUN yarn build


FROM python:3.7-alpine3.7

COPY . /app
WORKDIR /app

RUN pip install pipenv
RUN pipenv install --system

COPY --from=frontend-builder /frontend/dist /app/dist

EXPOSE 5000

CMD gunicorn --workers=2 backend:app -b localhost:5000
