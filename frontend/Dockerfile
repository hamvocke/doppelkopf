FROM node:14 as build

WORKDIR /app
COPY . ./
RUN yarn install && yarn build

FROM caddy:2-alpine

COPY --from=build /app/dist /var/www
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 80 443
