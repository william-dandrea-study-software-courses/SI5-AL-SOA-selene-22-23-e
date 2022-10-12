#!/bin/bash

# Building docker image
echo "[alert-notification-service-dev] START : Building image"
docker build --target docker-development -t "alert-notification-service-dev" .
echo "[alert-notification-service-dev] DONE : Building image"
