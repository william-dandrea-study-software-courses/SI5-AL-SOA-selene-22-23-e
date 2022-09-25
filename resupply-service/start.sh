#!/bin/bash

source ../common-functions.sh

echo "=> Starting resupply-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-resupply-alone.yml up -d

wait_on_health http://localhost:4301 ${PWD##*/}
