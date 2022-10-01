#!/bin/bash

# Building docker image
echo "[life-support-service] START : Building image"
docker build --target production -f Dockerfile -t "life-support-service" .
echo "[life-support-service] DONE : Building image"
