#!/bin/bash

# Building docker image
echo "[module-life-service] START : Building image"
docker build --target production -f Dockerfile -t "module-life-service" .
echo "[module-life-service] DONE : Building image"
