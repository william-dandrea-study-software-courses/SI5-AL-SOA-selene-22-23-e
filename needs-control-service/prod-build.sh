#!/bin/bash

# Building docker image
echo "[needs-control-service] START : Building image"
docker build --target production -f Dockerfile -t "needs-control-service" .
echo "[needs-control-service] DONE : Building image"
