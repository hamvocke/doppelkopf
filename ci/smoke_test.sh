#!/usr/bin/env bash

source ${BASH_SOURCE%/*}/_colors.sh

function smoke_test {
  url=$1

  e_step "smoke testing ${url}"

  n=0
  success=0
  until [ "$n" -ge 5 ]
  do
    status=`curl --silent --head $url | head -1 | cut -f 2 -d' '`
    if [ "$status" != "200" ]
    then
        e_error "Failed: status was other than '200': was '$status'"
        e_step "Retrying..."
    else
      success=1
      break
    fi
    n=$((n+1))
    sleep 5
  done

  if [ "$success" != 1 ]
  then
    e_error "Smoke test failed"
    exit 1
  fi

  e_success "Smoke test successful"
}
