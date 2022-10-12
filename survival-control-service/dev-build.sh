#!/bin/bash

# Building docker image
echo "[survival-control-service-dev] START : Building image"
docker build --target docker-development -t "survival-control-service-dev" .
echo "[survival-control-service-dev] DONE : Building image"
