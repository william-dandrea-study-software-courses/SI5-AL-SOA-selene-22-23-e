#!/bin/bash

# Building docker image
echo "[meteorite-monitoring-service-dev] START : Building image"
docker build --target docker-development -t "meteorite-monitoring-service-dev" .
echo "[meteorite-monitoring-service-dev] DONE : Building image"
