#!/bin/bash

# Building docker image
echo "[spacecraft-monitoring-service] START : Building image"
docker build --target production -f Dockerfile -t "spacecraft-monitoring-service" .
echo "[spacecraft-monitoring-service] DONE : Building image"
