#!/bin/bash

echo "=> Stopping life-support-service"
docker-compose --env-file ./.env.docker \
               --file docker-compose-life-support.yml down
