#!/bin/bash

echo "=> Starting development life-support-service"
docker-compose -f docker-compose-module-life-development.yml up --build -V
