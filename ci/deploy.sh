#! /usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh
set -e

e_header "Deploying backend"

e_step "Build Docker container"
docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
docker build -t hamvocke/doppelkopf .
e_mute "Done"

e_step "Push Docker container"
docker push hamvocke/doppelkopf:latest
e_mute "Done"

e_step "Start Docker container"
scp docker-compose.yml root@ham.codes:/data/doppelkopf/docker-compose.yml
ssh -T root@ham.codes << EOF
    cd /data/doppelkopf
    docker-compose pull
    docker-compose up -d
EOF
e_mute "Done"


e_header "Deploying frontend"

e_step "Upload static content..."
rsync -rvz --quiet --delete-after frontend/dist/ root@ham.codes:/tmp/doppelkopf -e "ssh -o StrictHostKeyChecking=no"
e_mute "Done"

e_step "Archive old website, activate current version"
ssh -T root@ham.codes << EOF
    rm -rf /data/archive/doppelkopf_bak/
    mkdir -p /data/archive && mv /data/doppelkopf/ /data/archive/doppelkopf_bak/
    mv /tmp/doppelkopf/ /data/doppelkopf
EOF
e_mute "Done"


e_step "Smoke tests..."
smoke_test https://doppelkopf.ham.codes
smoke_test https://doppelkopf.ham.codes/api
e_mute "Done"

e_success "Done. All good."
