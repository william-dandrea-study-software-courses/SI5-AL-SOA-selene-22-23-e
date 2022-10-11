#!/bin/bash

# Building docker image
echo "[survival-control-service] START : Building image"
docker build --target production -f Dockerfile -t "survival-control-service" .
echo "[survival-control-service] DONE : Building image"
