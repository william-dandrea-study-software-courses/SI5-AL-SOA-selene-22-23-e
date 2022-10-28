#!/bin/bash

# Building docker image
echo "[eva-mission-service] START : Building image"
docker build --target production -f Dockerfile -t "eva-mission-service" .
echo "[eva-mission-service] DONE : Building image"
