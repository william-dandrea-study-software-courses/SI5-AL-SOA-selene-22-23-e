#!/bin/bash

echo "=> Starting development gateway"
docker-compose -f docker-compose-gateway-development.yml up --build -V
