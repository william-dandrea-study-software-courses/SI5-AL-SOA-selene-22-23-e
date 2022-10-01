#!/bin/bash

# Building docker image
echo "[gateway-dev] START : Building image"
docker build --target docker-development -t "gateway-dev" .
echo "[gateway-dev] DONE : Building image"
