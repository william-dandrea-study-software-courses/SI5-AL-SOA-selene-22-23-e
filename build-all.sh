#!/bin/bash

function compile_dir()  # $1 is the dir to get it
{
    cd $1
    ./prod-build.sh
    cd ..
}

echo "=> Compiling everything"

compile_dir "survival-control-service"
compile_dir "module-life-service"
compile_dir "needs-control-service"
compile_dir "resupply-service"
compile_dir "gateway"

echo "=> Done all"
