#! /usr/bin/env sh

exec caddy run --config ./Caddyfile.${APP_ENVIRONMENT}
