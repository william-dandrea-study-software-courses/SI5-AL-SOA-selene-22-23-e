#!/bin/bash

echo "=> Stopping module-life-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-module-life.yml down
