#!/bin/bash

# Building docker image
echo "[spacecraft-service] START : Building image"
docker build --target production -f Dockerfile -t "spacecraft-service" .
echo "[spacecraft-service] DONE : Building image"
