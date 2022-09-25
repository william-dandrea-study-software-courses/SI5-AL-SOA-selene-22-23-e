#!/bin/bash

source ./common-functions.sh

echo "=> Starting all"
docker-compose --file life-support-service/docker-compose-life-support.yml \
               --file module-life-service/docker-compose-module-life.yml \
               --file needs-control-service/docker-compose-needs-control.yml \
               --file resupply-service/docker-compose-resupply.yml \
               --file gateway/docker-compose-gateway.yml up -d

wait_on_health_prod http://localhost:9500 "gateway"
wait_on_health_prod http://localhost:4301 "resupply-service"
wait_on_health_prod http://localhost:4302 "needs-control-service"
wait_on_health_prod http://localhost:4303 "module-life-service"
wait_on_health_prod http://localhost:4304 "life-support-service"

echo "=> All services started"
