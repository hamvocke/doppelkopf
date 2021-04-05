#! /usr/bin/env bash

ADDRESSES=(
    'https://doppelkopf.ham.codes'
    'https://doppelkopf.ham.codes/api/'
    'https://doppelkopf.ham.codes/admin/'
)

max_retries=10
retries=0

for ADDRESS in ${ADDRESSES[@]}; do
    echo "Checking ${ADDRESS}\n"
    until $(curl --output /dev/null --silent --head --fail "${ADDRESS}"); do
        if [ ${retries} -eq ${max_retries} ]; then
            echo "\nGiving up after ${retries} attempts"
            exit 1
        fi

        printf 'x'
        retries=$(($retries+1))
        sleep 5
    done
done
