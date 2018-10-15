#! /usr/bin/env bash

source _colors.sh
set -e

step "Deploying frontend"

step "Upload static content..."
#rsync -rvz frontend/dist/ root@ham.codes:/tmp/frontend

step "Backup old version..."
#ssh root@ham.codes 'mv /data/doppelkopf /data/backup/doppelkopf_bak'

step "Activate new version..."
#ssh root@ham.codes 'mv /tmp/frontend/ /data/doppelkopf'

step "Smoke test..."
status=`curl --silent --head https://www.hamvocke.com | head -1 | cut -f 2 -d' '`

if [ "$status" != "200" ]
then
    error "Failed: status was other than '200': was '$status'"
    exit 1
fi

success "Done. All good."
