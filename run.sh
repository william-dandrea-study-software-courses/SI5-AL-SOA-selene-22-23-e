#!/bin/bash
## common functions

set -e

function wait_on_health()  # $1 is URL of the NestJS service with health endpoint, $2 is the service name
{
   until [ $(curl --silent "$1"/health | grep \"status\":\"ok\" -c ) == 1 ]
   do
      sleep 3
   done
   echo "$2 service is up and running at $1"
}

wait_on_health http://localhost:9500 gateway

echo -e "\033[0;32m ===> Launch integration.sh \033[0m"
# ./integration.sh

echo -e "\033[0;32m ===> Launch python script \033[0m"
#docker run -it --rm --name demonstration-python demonstration-python

docker-compose --project-name soa --file ./docker-compose-test.yml up -d

sleep 2
echo "test"
test=docker ps | grep 'integration'
until [ $($test| wc -l) -ge 0 ]
do
  sleep 2
  echo "waiting integration scripts to finish"
  echo $test
  test=docker ps | grep 'integration'
done


echo "ts"
logs=$(docker logs soa_integration_1)
#echo $logs
echo "${logs//\*/\n}"
