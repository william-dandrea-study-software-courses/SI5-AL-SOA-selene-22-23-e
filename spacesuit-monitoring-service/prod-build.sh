#!/bin/bash

# Building docker image
echo "[spacesuit-monitoring-service] START : Building image"
docker build --target production -f Dockerfile -t "spacesuit-monitoring-service" .
echo "[spacesuit-monitoring-service] DONE : Building image"
