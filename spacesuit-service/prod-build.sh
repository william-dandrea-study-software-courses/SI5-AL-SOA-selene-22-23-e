#!/bin/bash

# Building docker image
echo "[spacesuit-service] START : Building image"
docker build --target production -f Dockerfile -t "spacesuit-service" .
echo "[spacesuit-service] DONE : Building image"
