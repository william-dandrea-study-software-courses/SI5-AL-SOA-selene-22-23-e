#!/bin/bash

# Building docker image
echo "[module-life-service-dev] START : Building image"
docker build --target docker-development -t "space-craft-service-dev" .
echo "[module-life-service-dev] DONE : Building image"
