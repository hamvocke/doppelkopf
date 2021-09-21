# Doppelkopf
[![Build status](https://circleci.com/gh/hamvocke/doppelkopf.svg?style=svg)](https://circleci.com/gh/hamvocke/doppelkopf)
[![codecov](https://codecov.io/gh/hamvocke/doppelkopf/branch/master/graph/badge.svg?token=00G78SO5HF)](https://codecov.io/gh/hamvocke/doppelkopf)

An in-browser implementation of the traditional German [Doppelkopf](https://en.wikipedia.org/wiki/Doppelkopf) card game.

## Live Demo
The game is still in early stages. Playing it will probably be a frustrating and confusing experience. If you're curious enough to give it a try (and play against a really shitty AI), I encourage you to do so:

[![Screenshot](https://i.imgur.com/qQPyE3I.png)](https://doppelkopf.ham.codes/)

<h3 align="center"><a href="https://doppelkopf.ham.codes/">Try the Live Demo</a></h3>

## Development
The game is implemented using TypeScript and [vue.js](https://vuejs.org/). It's capable to run as an offline-first, standalone web application that does not rely on being connected to a backend.

The backend part is written in Python and using the [Flask](http://flask.pocoo.org/) microframework. It's a tiny application that's only serving administrative tasks (e.g. feature toggles) and collects some high-level metrics about games that have been played.

## Getting Started

### Frontend
To work on the frontend, go to the `frontend/` directory

    cd frontend

Install frontend dependencies:

    yarn install

Serve the frontend development server on [localhost:8080](http://localhost:8080).

    yarn serve

Run the tests before and after making changes:

    yarn test:unit
    yarn test:e2e


### Backend
Install backend dependencies:

    cd backend
    pipenv install --dev

If this is the first time you're setting up the backend, you need to create an `admin` user that you can use to log in with. Currently, the backend is hard-wired to look for a user called `admin` so don't change that. For the password you're free to chose whatever you fancy. Something like this:

    make create_user username=admin password=admin

Start the backend development server on [localhost:5000](http://localhost:5000):

    make run

Run the tests before and after making changes:

    make test


### Testing
We're very serious about testing. All bug fixes and new features should come with new tests. Backend tests are implemented with [pytest](https://docs.pytest.org/), frontend unit tests with [Jest](https://jestjs.io/) and frontend end-to-end tests with [nightwatch.js](https://nightwatchjs.org/).


### Testing the `docker-compose` build
Make sure `docker-compose` and `docker` are properly installed.

Using `docker-compose` you can start the proxy server that serves the frontend application as well as the backend application at once.

**Run the local build**:

1. Make sure that you've got a `.env` file in the `backend/` directory (you can copy the `.env.sample` one and adapt its values)
2. run `docker-compose build`
3. `export APP_ENVIRONMENT=local && docker-compose up`

**Run the production build**:

1. Make sure that you've got a `backend.env` file in the current directory
2. run `docker-compose build` (or pull via `docker-compose pull`)
3. `export APP_ENVIRONMENT=prod && docker-compose up -f docker-compose.yml -f docker-compose.prod.yml`

### More Helpful Commands

Build the frontend application for production, with minification:

    yarn build

Build for production and view the bundle analyzer report

    yarn build --report

