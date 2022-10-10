#!/bin/bash

# Building docker image
echo "[space-craft-service] START : Building image"
docker build --target production -f Dockerfile -t "space-craft-service" .
echo "[space-craft-service] DONE : Building image"
