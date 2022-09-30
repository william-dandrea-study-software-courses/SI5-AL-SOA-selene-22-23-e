#!/bin/bash

function compile_dir()  # $1 is the dir to get it
{
    cd $1
    rm -rf dist
    chmod a+x prod-build.sh
    ./prod-build.sh
    cd ..
}

compile_dir "needs-control-service"
compile_dir "gateway"
compile_dir "life-support-service"
compile_dir "module-life-service"
compile_dir "resupply-service"

docker-compose --project-name soa --file ./docker-compose-prod.yml up -d
