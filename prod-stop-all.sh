#!/bin/bash



docker-compose --project-name soa \
               --file ./docker-compose-prod.yml \
               down
