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

function buildAll()
{
  compile_dir "eva-mission-service"
  compile_dir "spacecraft-service"
  compile_dir "spacesuit-service"
  compile_dir "gateway"
  compile_dir "survival-control-service"
  compile_dir "module-life-service"
  compile_dir "needs-control-service"
  compile_dir "resupply-service"
}


echo "Enter 1 if you want to build and run, 2 if you want to run"
read value

if [ $value -eq 1 ]
then
  echo "Oui"
  buildAll
fi
docker-compose --project-name soa-dev --file ./docker-compose-dev.yml up -d
