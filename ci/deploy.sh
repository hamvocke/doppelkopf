#! /usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh
source ${BASH_SOURCE%/*}/smoke_test.sh

set -e

e_header "Deploying"

e_step "Build Docker containers"
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker-compose build
e_mute "Done"

e_step "Push Docker containers"
docker-compose push
e_mute "Done"

e_step "Start Docker containers"
scp -o StrictHostKeyChecking=no docker-compose{.prod,}yml root@ham.codes:/data/doppelkopf/docker-compose.yml
ssh -T root@ham.codes -o StrictHostKeyChecking=no << EOF
    cd /data/doppelkopf
    docker-compose pull
    docker-compose up -d
EOF
e_mute "Done"

e_step "Smoke tests..."
sleep 5
smoke_test https://doppelkopf.ham.codes
smoke_test https://doppelkopf.ham.codes/api/
e_mute "Done"

e_success "Done. All good."
