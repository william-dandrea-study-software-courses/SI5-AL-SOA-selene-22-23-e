#!/bin/bash

# Building docker image
echo "[astronaut-service] START : Building image"
docker build --target production -f Dockerfile -t "astronaut-service" .
echo "[astronaut-service] DONE : Building image"
