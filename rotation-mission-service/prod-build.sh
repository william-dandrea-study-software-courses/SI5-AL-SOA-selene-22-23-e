#!/bin/bash

# Building docker image
echo "[rotation-mission-service] START : Building image"
docker build --target production -f Dockerfile -t "rotation-mission-service" .
echo "[rotation-mission-service] DONE : Building image"
