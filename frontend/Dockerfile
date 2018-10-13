FROM node:alpine as frontend-builder

COPY . /frontend
WORKDIR /frontend

RUN yarn install && yarn build


FROM nginx:stable-alpine

COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
