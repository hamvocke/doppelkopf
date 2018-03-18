FROM nginx:alpine

COPY nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8012

COPY dist /usr/share/nginx/html
