#!/bin/bash

docker stop zelda-mongo
docker rm zelda-mongo

docker stop zelda-mongo-express
docker rm zelda-mongo-express

docker run -d -P --name zelda-mongo library/mongo:latest

sleep 20

docker run -d --link zelda-mongo:zelda-mongo -p 8087:8081 -e "ME_CONFIG_MONGODB_SERVER=zelda-mongo" --name zelda-mongo-express library/mongo-express