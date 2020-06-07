#! /usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh
source ${BASH_SOURCE%/*}/smoke_test.sh

set -e

e_header "Deploying backend"
pushd backend

e_step "Build Docker container"
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t hamvocke/doppelkopf .
e_mute "Done"

e_step "Push Docker container"
docker push hamvocke/doppelkopf:latest
e_mute "Done"

e_step "Start Docker container"
scp -o StrictHostKeyChecking=no docker-compose.yml root@ham.codes:/data/doppelkopf_backend/docker-compose.yml
ssh -T root@ham.codes -o StrictHostKeyChecking=no << EOF
    cd /data/doppelkopf_backend
    docker-compose pull
    docker-compose up -d
EOF
e_mute "Done"

e_step "Smoke tests..."
sleep 5
smoke_test https://doppelkopf.ham.codes/api/
e_mute "Done"

e_success "Done. All good."
popd
