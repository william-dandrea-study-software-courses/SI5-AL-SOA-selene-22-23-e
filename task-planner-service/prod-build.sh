#!/bin/bash

# Building docker image
echo "[task-planner-service] START : Building image"
docker build --target production -f Dockerfile -t "task-planner-service" .
echo "[task-planner-service] DONE : Building image"
