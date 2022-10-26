#!/bin/bash

# Building docker image
echo "[news-service] START : Building image"
docker build --target production -f Dockerfile -t "news-service" .
echo "[news-service] DONE : Building image"
