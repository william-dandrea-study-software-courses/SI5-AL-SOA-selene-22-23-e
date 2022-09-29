#!/bin/bash

function compile_dir()  # $1 is the dir to get it
{
    cd $1
    # rm -rf dist node_modules
    # npm ci
    chmod a+x dev-build.sh
    ./dev-build.sh
    cd ..
}


compile_dir "gateway"
compile_dir "life-support-service"
compile_dir "module-life-service"
compile_dir "needs-control-service"
compile_dir "resupply-service"

docker-compose --project-name soa-dev \
               --file ./docker-compose-dev.yml \
               up -d
