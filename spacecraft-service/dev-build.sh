#!/bin/bash

# Building docker image
echo "[spacecraft-service-dev] START : Building image"
docker build --target docker-development -t "spacecraft-service-dev" .
echo "[spacecraft-service-dev] DONE : Building image"
