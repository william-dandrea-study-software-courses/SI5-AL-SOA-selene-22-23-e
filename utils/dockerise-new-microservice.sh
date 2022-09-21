#!/bin/bash

echo "Path to the micro-service folder :"
read path_to_microservice

echo "Name of the micro service (example : resupply-service)"
read microservice_name

echo "Generic name of the micro service (example : resupply)"
read microservice_generic_name

echo "SWAGGER UI Title (exemple : Resupply Micro-Service)"
read swagger_ui_title

echo "SWAGGER UI Description"
read swagger_ui_description

echo "Project name (exemple : soa-team-e)"
read project_name

echo "App port (4001)"
read app_port

echo "Deployment port"
read deployment_app_port

echo "Port MongoDB prod"
read mongo_db_port

echo "
# APP
APP_PORT=$app_port
APP_NAME=$microservice_name

# MONGODB
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=$microservice_generic_name-db

# SWAGGER UI
SWAGGERUI_PATH=doc/$microservice_generic_name
SWAGGERUI_TITLE=$swagger_ui_title
SWAGGERUI_DESCRIPTION=$swagger_ui_description
" > "$path_to_microservice/.env"

echo "
# FOR DOCKER COMPOSE
COMPOSE_PROJECT_NAME=\"$project_name\"
" > "$path_to_microservice/.env.docker"

echo "
# APP
APP_PORT=$deployment_app_port
APP_NAME=$microservice_name

# MONGODB
MONGODB_HOST=mongo_db_$microservice_generic_name
MONGODB_PORT=27017
MONGODB_DATABASE=$microservice_generic_name-db

# SWAGGER UI
SWAGGERUI_PATH=doc/$microservice_generic_name
SWAGGERUI_TITLE=$swagger_ui_title
SWAGGERUI_DESCRIPTION=$swagger_ui_description
" > "$path_to_microservice/.env.production"

echo "
v16.16.0
" > "$path_to_microservice/.nvmrc"

echo "
#!/bin/bash

APP=\"" + "$" + "{PWD##*/}" + "\"

# Building docker image
echo \"Begin: Building docker image $project_name/$" + "APP" + "\"
docker build -t \"$project_name/$" + "APP" + "\" .
echo \"Done: Building docker image $project_name/$" + "APP" + "\"
" > "$path_to_microservice/build.sh"

echo "
version: \"3\"

services:
  $microservice_name:
    image: \"$project_name/$microservice_name\"
    restart: always
    ports:
      - $deployment_app_port:3000
    depends_on:
      - mongo_db_$microservice_generic_name
    networks:
      - $project_name-network
  mongo_db_$microservice_generic_name:
    image: \"mongo:4.4.15\"
    restart: always
    ports:
      - $mongo_db_port:27017
    networks:
      - $project_name-network
networks:
  $project_name-network:
    driver: bridge
" > "$path_to_microservice/docker-compose-$microservice_generic_name.yml"

echo "
###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16.16.0-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16.16.0-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:16.16.0-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env.production ./.env

CMD [ \"node\", \"dist/main.js\" ]
" > "$path_to_microservice/Dockerfile"

echo "
#!/bin/bash

source ../common-functions.sh

echo \"=> Starting $microservice_name\"
docker-compose --env-file ./.env.docker \
               --file docker-compose-$microservice_generic_name.yml up -d

wait_on_health http://localhost:4301 " + "$" + "{PWD##*/}" + "
" > "$path_to_microservice/start.sh"

echo "

#!/bin/bash

echo \"=> Stopping resupply-service\"
docker-compose --env-file ./.env.docker \
               --file docker-compose-$microservice_generic_name.yml down
" > "$path_to_microservice/stop.sh"
