#!/bin/bash

echo "stopping gateway"
docker-compose --env-file ./.env.docker \
               --file docker-compose-gateway-development.yml down
