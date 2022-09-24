#!/bin/bash

echo "=> Starting all"
docker-compose --env-file ./.env.docker \
               --file life-support-service/docker-compose-life-support.yml \
               --file module-life-service/docker-compose-module-life.yml \
               --file needs-control-service/docker-compose-needs-control.yml \
               --file resupply-service/docker-compose-resupply.yml up -d

echo "=> All services started"
