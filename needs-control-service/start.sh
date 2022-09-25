#!/bin/bash

source ../common-functions.sh

echo "=> Starting needs-control-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-needs-control-alone.yml up -d

wait_on_health http://localhost:4302 ${PWD##*/}
