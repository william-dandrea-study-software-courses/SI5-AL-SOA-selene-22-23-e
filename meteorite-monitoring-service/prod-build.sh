#!/bin/bash

# Building docker image
echo "[meteorite-monitoring-service] START : Building image"
docker build --target production -f Dockerfile -t "meteorite-monitoring-service" .
echo "[meteorite-monitoring-service] DONE : Building image"
