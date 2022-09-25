#!/bin/bash

source ../common-functions.sh

echo "=> Starting module-life-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-module-life-alone.yml up -d

wait_on_health http://localhost:4303 ${PWD##*/}
