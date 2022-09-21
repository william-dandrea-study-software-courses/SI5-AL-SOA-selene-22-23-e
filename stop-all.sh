#!/bin/bash

echo "=> Stopping all"
docker-compose  --env-file ./.env.docker \
                --file life-support-service/docker-compose-life-support.yml \
                --file module-life-service/docker-compose-module-life.yml \
                --file needs-control-service/docker-compose-needs-control.yml \
                --file resupply-service/docker-compose-resupply.yml down

echo "=> All services stopped"
