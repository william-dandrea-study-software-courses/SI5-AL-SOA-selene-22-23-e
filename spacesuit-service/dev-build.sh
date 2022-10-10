#!/bin/bash

# Building docker image
echo "[spacesuit-service-dev] START : Building image"
docker build --target docker-development -t "spacesuit-service-dev" .
echo "[spacesuit-service-dev] DONE : Building image"
