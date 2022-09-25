#!/bin/bash

APP="${PWD##*/}"

# Building docker image
echo "Begin: Building docker image soa-team-e/$APP"
docker build -t "soa-team-e/$APP" .
echo "Done: Building docker image soa-team-e/$APP"