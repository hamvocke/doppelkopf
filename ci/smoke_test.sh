#!/usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh

function smoke_test {
  url=$1

  e_step "smoke testing ${url}"

  status=`curl --silent --head $url | head -1 | cut -f 2 -d' '`
  if [ "$status" != "200" ]
  then
      e_error "Failed: status was other than '200': was '$status'"
      exit 1
  fi

  e_success "Done. All good."
}
