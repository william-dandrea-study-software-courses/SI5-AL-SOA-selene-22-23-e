#!/bin/bash

# Building docker image
echo "[news-service-dev] START : Building image"
docker build --target docker-development -t "news-service-dev" .
echo "[news-service-dev] DONE : Building image"
