#! /usr/bin/env sh

exec caddy run --config /etc/caddy/Caddyfile.${APP_ENVIRONMENT}
