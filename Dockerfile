FROM nginx:alpine

RUN yarn build

COPY dist /usr/share/nginx/html
