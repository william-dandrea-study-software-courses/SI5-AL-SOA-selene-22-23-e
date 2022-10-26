#!/bin/bash

# Building docker image
echo "[news-formalisation-service] START : Building image"
docker build --target production -f Dockerfile -t "news-formalisation-service" .
echo "[news-formalisation-service] DONE : Building image"
