#!/bin/bash
echo "Build whole image"
docker build -t teame/life-support-service ./life-support-service
docker build -t teame/module-life-service ./module-life-service
docker build -t teame/needs-control-service ./needs-control-service
docker build -t teame/resupply-service ./resupply-service
