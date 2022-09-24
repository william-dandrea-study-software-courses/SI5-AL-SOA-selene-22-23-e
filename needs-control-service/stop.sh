#!/bin/bash

echo "=> Stopping needs-control-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-needs-control.yml down
