# Doppelkopf
[![Build status](https://circleci.com/gh/hamvocke/doppelkopf.svg?style=svg)](https://circleci.com/gh/hamvocke/doppelkopf)
[![codecov](https://codecov.io/gh/hamvocke/doppelkopf/branch/master/graph/badge.svg?token=00G78SO5HF)](https://codecov.io/gh/hamvocke/doppelkopf)

An in-browser implementation of the traditional German [Doppelkopf](https://en.wikipedia.org/wiki/Doppelkopf) card game.

## Live Demo
[![Screenshot](https://i.imgur.com/qQPyE3I.png)](https://doppelkopf.party)

<h3 align="center"><a href="https://doppelkopf.party/">Try the Live Demo at doppelkopf.party</a></h3>

## Features

This game is still a work in progress. You will see that it's playable but some features are still missing that you might know from other Doppelkopf games:

* [x] Single player mode
* [x] Playing multiple rounds
* [x] Score calculation
* [x] Announcements & Bids
* [x] Extra points for winning a Doppelkopf, catching a fox, Charlie
* [ ] Playing solo
* [ ] Weddings
* [ ] Custom rules

## Development
The game is implemented using TypeScript and [vue.js](https://vuejs.org/). It's a small, frontend-only standalone web application that can be hosted anywhere you can host static websites.

## Getting Started

### Frontend
To work on the frontend, go to the `frontend/` directory

    cd frontend

Make sure you use node v16 or greater.

Install frontend dependencies:

    npm install

Serve the frontend development server on [localhost:5173](http://localhost:5173).

    npm run dev

Run the tests before and after making changes:

    npm run test


### Testing
We're very serious about testing. All bug fixes and new features should come with new tests. Unit tests with [Jest](https://jestjs.io/) and frontend end-to-end tests with [nightwatch.js](https://nightwatchjs.org/).

### More Helpful Commands

Build the frontend application for production, with minification:

    npm run build

