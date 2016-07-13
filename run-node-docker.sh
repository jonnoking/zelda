#!/bin/bash

CONTAINER_NAME=zelda-node-dev
NODE_APP=/Users/jonno/Development/node-dev/zelda

#docker stop ${CONTAINER_NAME}
#docker rm ${CONTAINER_NAME}

#docker run -d -p 3000:3000 --name ${CONTAINER_NAME} -e "NODE_EVN=development" -v ${NODE_APP}:/zelda

docker stop zelda-dev
docker rm zelda-dev
docker run -d -p 3000:3000 -p 5858:5858 --dns 8.8.8.8 --name zelda-dev -e "NODE_EVN=development" -v `pwd`:/zelda --link=zelda-mongo:zelda-mongo library/node:latest /zelda/run-node-setup.sh
 