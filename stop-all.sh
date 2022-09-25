#!/bin/bash

echo "=> Stopping all"
docker-compose  --file life-support-service/docker-compose-life-support.yml \
                --file module-life-service/docker-compose-module-life.yml \
                --file needs-control-service/docker-compose-needs-control.yml \
                --file resupply-service/docker-compose-resupply.yml \
                --file gateway/docker-compose-gateway.yml down

echo "=> All services stopped"
