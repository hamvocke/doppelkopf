# Doppelkopf
[![Build Status](https://travis-ci.org/hamvocke/doppelkopf.svg?branch=master)](https://travis-ci.org/hamvocke/doppelkopf)

An in-browser implementation of the traditional German [Doppelkopf](https://en.wikipedia.org/wiki/Doppelkopf) card game.

## Live Demo
The game is still in early stages. Playing it will probably be a frustrating and confusing experience. If you're curious enough to give it a try (and play against a really shitty AI), I encourage you to do so:

### [Try the Live Demo](https://doppelkopf.ham.codes/)

## Development
This game is implemented using ES2016. The source code is transpiled using Babel and bundled and loaded with Webpack. The frontend is written in [vue.js](https://vuejs.org/)

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run unit tests
yarn unit

# run e2e tests
yarn e2e

# run all tests
yarn test
```
