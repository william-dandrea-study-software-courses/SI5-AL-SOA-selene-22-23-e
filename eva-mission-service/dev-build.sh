#!/bin/bash

# Building docker image
echo "[eva-mission-service-dev] START : Building image"
docker build --target docker-development -t "space-craft-service-dev" .
echo "[eva-mission-service-dev] DONE : Building image"
