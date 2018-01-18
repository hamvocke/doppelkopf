#!/usr/bin/env bash

ssh root@ham.codes 'docker pull hamvocke/doppelkopf'
ssh root@ham.codes 'docker stop doppelkopf'
ssh root@ham.codes 'docker rm doppelkopf'
ssh root@ham.codes 'docker run -it -d -p 80:8080 --name doppelkopf hamvocke/doppelkopf'
