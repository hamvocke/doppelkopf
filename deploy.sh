#!/usr/bin/env bash

yarn build
docker build -t "doppelkopf:latest" .
