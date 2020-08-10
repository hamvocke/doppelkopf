#!/usr/bin/env bash

function smoke_test {
  url=$1

  echo "smoke testing ${url}"

  n=0
  success=0
  until [ "$n" -ge 5 ]
  do
    status=`curl --silent --head $url | head -1 | cut -f 2 -d' '`
    if [ "$status" != "200" ]
    then
        echo "Failed: status was other than '200': was '$status'"
        echo "Retrying..."
    else
      success=1
      break
    fi
    n=$((n+1))
    sleep 5
  done

  if [ "$success" != 1 ]
  then
    echo "Smoke test failed"
    exit 1
  fi

  echo "Smoke test successful"
}
