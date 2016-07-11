#!/bin/bash

cd /zelda
npm install
npm install -g nodemon
#./node_modules/nodemon/bin/nodemon.js --legacy-watch app.js

nodemon ./bin/www -w ./