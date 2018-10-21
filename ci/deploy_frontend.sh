#! /usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh
set -e

e_header "Deploying frontend"

e_step "Upload static content..."
rsync -rvz frontend/dist/ root@ham.codes:/tmp/doppelkopf -e "ssh -o StrictHostKeyChecking=no"
e_mute "Done"

e_step "Archive old website, activate current version"
ssh -T root@ham.codes << EOF
    rm -rf /data/archive/doppelkopf_bak/
    mkdir -p /data/archive && mv /data/doppelkopf/ /data/archive/doppelkopf_bak/
    mv /tmp/doppelkopf/ /data/doppelkopf
EOF
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
