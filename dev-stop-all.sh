#!/bin/bash


docker-compose --project-name soa-dev \
               --file ./docker-compose-dev.yml \
               down -v
