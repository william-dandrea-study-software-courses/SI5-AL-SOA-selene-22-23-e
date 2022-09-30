#!/bin/bash

# Building docker image
echo "[module-life-service-dev] START : Building image"
docker build --target docker-development -t "module-life-service-dev" .
echo "[module-life-service-dev] DONE : Building image"
