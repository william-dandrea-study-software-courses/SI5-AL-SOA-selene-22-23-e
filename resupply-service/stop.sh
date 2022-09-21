#!/bin/bash

echo "=> Stopping resupply-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-resupply.yml down
