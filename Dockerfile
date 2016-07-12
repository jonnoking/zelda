FROM nginx:latest

ADD certs/server.crt /etc/nginx/server.crt
ADD certs/server.key /etc/nginx/server.key
#ADD nginx/nginx.conf /etc/nginx/conf.d/default.conf
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD web /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

