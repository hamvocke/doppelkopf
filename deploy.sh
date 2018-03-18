#!/usr/bin/env bash

ssh root@ham.codes 'docker pull hamvocke/doppelkopf:latest'
ssh root@ham.codes 'docker tag hamvocke/doppelkopf dokku/doppelkopf:latest'
ssh root@ham.codes 'dokku tags:deploy doppelkopf'

