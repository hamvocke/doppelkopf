#! /usr/bin/env bash

source _colors.sh
set -e

e_header "Deploying frontend"

e_step "Upload static content..."
rsync -rvz frontend/dist/ root@ham.codes:/tmp/frontend
e_mute "Done"

e_step "Backup old version..."
ssh root@ham.codes 'mv /data/doppelkopf /data/backup/doppelkopf_bak'
e_mute "Done"

e_step "Activate new version..."
ssh root@ham.codes 'mv /tmp/frontend/ /data/doppelkopf'
e_mute "Done"

e_step "Smoke test..."
status=`curl --silent --head https://doppelkopf.ham.codes | head -1 | cut -f 2 -d' '`
if [ "$status" != "200" ]
then
    error "Failed: status was other than '200': was '$status'"
    exit 1
fi
e_mute "Done"

e_success "Done. All good."
