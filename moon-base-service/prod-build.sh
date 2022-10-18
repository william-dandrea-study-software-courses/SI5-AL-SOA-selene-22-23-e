#!/bin/bash

# Building docker image
echo "[moon-base-service] START : Building image"
docker build --target production -f Dockerfile -t "moon-base-service" .
echo "[moon-base-service] DONE : Building image"
