# Doppelkopf
[![Build Status](https://travis-ci.org/hamvocke/doppelkopf.svg?branch=master)](https://travis-ci.org/hamvocke/doppelkopf)

An in-browser implementation of the traditional German [Doppelkopf](https://en.wikipedia.org/wiki/Doppelkopf) card game.

## Live Demo
The game is still in early stages. Playing it will probably be a frustrating and confusing experience. If you're curious enough to give it a try (and play against a really shitty AI), I encourage you to do so:

[![Screenshot](https://i.imgur.com/sZCuRr4.png)](https://doppelkopf.ham.codes/)

<h3 align="center"><a href="https://doppelkopf.ham.codes/">Try the Live Demo</a></h3>

## Development
This game is implemented using ES2017. The source code is transpiled using Babel and bundled and loaded with Webpack. The frontend is written in [vue.js](https://vuejs.org/).

The backend part is written in Python and using the [Flask](http://flask.pocoo.org/) microframework.

### Getting Started
Install frontend and backend dependencies:

    $ yarn install
    $ pipenv install --dev

To serve the frontend as a standalone application, run

    $ yarn serve

To start the backend, run

    $ make run

### Run Tests
Tests for both, frontend and backend, are included in the `test` directory. Backend tests are implemented with [pytest](https://docs.pytest.org/), frontend tests with [Jest](https://jestjs.io/).

To run the frontend tests, use

    $ yarn test:unit
    $ yarn test:e2e

Backend tests can be run with

    $ make test

### Storybook
The application uses [storybook.js](https://storybook.js.org/) to showcase all vue.js components in different states. You can use the storybook to take a look at components and use it as a visual test case. It's great for getting fast feedback when designing components.

For new components, add a new story to `src/stories`.

You can view the storybook by running

    $ yarn storybook

and then pointing your browser to [localhost:6006](http://localhost:6006)

### More Helpful Commands

Build the frontend application for production, with minification:

    $ yarn build

Build for production and view the bundle analyzer report

    $ yarn build --report

