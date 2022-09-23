#!/bin/bash

source ../common-functions.sh

echo "=> Starting life-support-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-life-support.yml up -d

wait_on_health http://localhost:4304 ${PWD##*/}
