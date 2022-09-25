#!/bin/bash

source ../common-functions.sh

echo "starting gateway"
docker-compose --env-file ./.env.docker \
               --file docker-compose-gateway-development.yml up -d

wait_on_health http://localhost:9500 ${PWD##*/}
