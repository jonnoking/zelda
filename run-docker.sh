#!/bin/bash

CONTAINER_NAME=zelda-node-dev
NODE_APP=/Users/jonno/Development/node-dev/zelda

#docker stop ${CONTAINER_NAME}
#docker rm ${CONTAINER_NAME}

#docker run -d -p 3000:3000 --name ${CONTAINER_NAME} -e "NODE_EVN=development" -v ${NODE_APP}:/zelda

docker stop zelda-dev
docker rm zelda-dev
docker run -d -p 3000:3000 --name zelda-dev -v `pwd`:/zelda --link=mongo:zelda-mongo library/node:latest /zelda/run-docker-app.sh
 