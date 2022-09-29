#!/bin/bash

# Building docker image
echo "[needs-control-service-dev] START : Building image"
docker build --target docker-development -t "needs-control-service-dev" .
echo "[needs-control-service-dev] DONE : Building image"
