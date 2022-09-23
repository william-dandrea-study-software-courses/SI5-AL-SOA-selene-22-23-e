#!/bin/bash

echo "Name of the micro-service to run in dev mode:"

read path_to_microservice

echo "Run $path_to_microservice"

cd $path_to_microservice

./start-dev.sh

