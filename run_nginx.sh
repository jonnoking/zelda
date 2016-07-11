#!/bin/bash

docker stop zelda-www
docker rm zelda-www
docker run -d -p 8080:80 --name zelda-www -v $(pwd)/web:/var/www -v $(pwd)/nginx/nginx.conf:/etc/nginx/nginx.conf --link=zelda-dev:zelda-dev library/nginx:latest
