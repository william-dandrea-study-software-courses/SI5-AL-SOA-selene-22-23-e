#!/bin/bash

echo "=> Starting development life-support-service"
docker-compose -f docker-compose-life-support-development.yml up --build -V
