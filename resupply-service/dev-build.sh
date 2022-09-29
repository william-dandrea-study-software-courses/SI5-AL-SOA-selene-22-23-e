#!/bin/bash

# Building docker image
echo "[resuply-service-dev] START : Building image"
docker build --target docker-development -t "resupply-service-dev" .
echo "[resuply-service-dev] DONE : Building image"
