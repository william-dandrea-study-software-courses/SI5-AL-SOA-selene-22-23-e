#!/bin/bash

# Demonstrate
cd demonstration || exit
docker build --target production -t demonstration-python .
cd ..


