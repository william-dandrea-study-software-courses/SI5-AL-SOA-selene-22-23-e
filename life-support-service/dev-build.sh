#!/bin/bash

# Building docker image
echo "[life-support-service-dev] START : Building image"
docker build --target docker-development -t "life-support-service-dev" .
echo "[life-support-service-dev] DONE : Building image"
