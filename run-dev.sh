#!/bin/bash

function compile_dir()  # $1 is the dir to get it
{
    cd $1
    ./build.sh
    cd ..
}

echo "=> Compiling everything"

compile_dir "life-support-service"
compile_dir "module-life-service"
compile_dir "needs-control-service"
compile_dir "resupply-service"

echo "=> Done all"
