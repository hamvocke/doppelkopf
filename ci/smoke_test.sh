#! /usr/bin/env bash

. ci/smoke.sh

smoke_url_ok "https://doppelkopf.ham.codes"
    smoke_assert_body "Doppelkopf"
smoke_url_ok "https://doppelkopf.ham.codes/api/"
    smoke_assert_body "Healthy"
smoke_url_ok "https://doppelkopf.ham.codes/admin"
    smoke_assert_body "Password"
smoke_report
