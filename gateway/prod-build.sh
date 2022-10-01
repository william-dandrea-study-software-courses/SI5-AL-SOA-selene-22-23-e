#!/bin/bash

# Building docker image
echo "[gateway] START : Building image"
docker build --target production -f Dockerfile -t "gateway" .
echo "[gateway] DONE : Building image"
