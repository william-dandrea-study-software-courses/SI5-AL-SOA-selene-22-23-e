

set -e

function wait_on_health()  # $1 is URL of the NestJS service with health endpoint, $2 is the service name
{
   until [ $(curl --silent "$1"/health | grep \"status\":\"ok\" -c ) == 1 ]
   do
      echo "$2 service not ready at $1"
      sleep 3
   done
   echo "$2 service is up and running at $1"
}

function wait_on_health_prod()  # $1 is URL of the NestJS service with health endpoint, $2 is the service name
{
   until [ $(curl --silent "$1"/health | grep \"status\":\"ok\" -c ) == 1 ]
   do
      sleep 3
   done
   echo "$2 service is up and running at $1"
}
