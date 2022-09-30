#!/bin/bash

# Building docker image
echo "[resupply-service] START : Building image"
docker build --target production -f Dockerfile -t "resupply-service" .
echo "[resupply-service] DONE : Building image"
