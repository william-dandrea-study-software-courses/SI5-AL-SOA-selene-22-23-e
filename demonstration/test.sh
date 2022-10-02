#!/bin/bash

sleep 3
curl http://google.com
PATH="/health"
test=$(curl --silent "$1$PATH" | grep '\"status\":\"ok\"' -c )
until [ $test == 1 ]
do
  sleep 3
  echo "waiting $1$PATH"
  echo $test
  test=$(curl --silent "$1$PATH" | grep \"status\":\"ok\" -c )
done
echo "service is up and running"
