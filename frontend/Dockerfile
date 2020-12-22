FROM caddy:2-alpine

COPY dist/ /var/www
COPY Caddyfile.* /etc/caddy/
COPY entrypoint.sh .
EXPOSE 80 443

RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
