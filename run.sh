#!/bin/bash

echo -e "\033[0;32m ===> Launch integration.sh \033[0m"
# ./integration.sh

echo -e "\033[0;32m ===> Launch python script \033[0m"
docker run -it --rm --name demonstration-python demonstration-python

