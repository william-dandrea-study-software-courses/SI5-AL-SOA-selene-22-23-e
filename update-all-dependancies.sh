#!/bin/bash

cd ./life-support-service || exit
rm -rf node_modules;rm package-lock.json;npm i

cd ../module-life-service || exit
rm -rf node_modules;rm package-lock.json;npm i

cd ../needs-control-service || exit
rm -rf node_modules;rm package-lock.json;npm i

cd ../resupply-service || exit
rm -rf node_modules;rm package-lock.json;npm i
