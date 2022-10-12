#!/bin/bash

# Building docker image
echo "[alert-notification-service] START : Building image"
docker build --target production -f Dockerfile -t "alert-notification-service" .
echo "[alert-notification-service] DONE : Building image"
