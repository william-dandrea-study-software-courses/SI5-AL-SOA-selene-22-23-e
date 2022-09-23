#!/bin/bash

echo "=> Starting development life-support-service"
docker-compose -f docker-compose-resupply-development.yml up --build -V
