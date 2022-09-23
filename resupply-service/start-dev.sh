#!/bin/bash

echo "=> Starting development life-support-service"
docker-compose -f docker-compose-needs-control-development.yml up --build -V
