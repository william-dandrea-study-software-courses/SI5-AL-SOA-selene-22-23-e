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


echo -e "===> Awaiting all services ready"
wait_on_health http://localhost:9500 gateway

echo -e "===> Launch docker container running python integration script"
docker-compose --project-name soa --file ./docker-compose-test.yml up -d

integrationContainer=$(docker ps | grep 'soa-integration-team-e' | wc -l)
until [ $integrationContainer = 0 ]
do
  sleep 2
  integrationContainer=$(docker ps | grep 'soa-integration-team-e' | wc -l)
done

logs=$(docker logs soa-integration-team-e)
#echo $logs
echo "${logs//\*/\n}"
