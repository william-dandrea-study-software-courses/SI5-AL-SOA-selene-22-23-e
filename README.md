# Project MicroServices SOA - Team E

## Contributors
- Arthur Soens
- Emma Glesser
- Laurie Fernandez
- William D'Andrea

##Documentation
You can find our first delivery report in the documentation directory.

## How to create a new module in a microservice
*You need to execute this commands in the source root of the microservice (exemple : in the repository life-support-service*


- For creating the new module (file automatically generated)
```shell
nest g mo <name-of-the-module>
```

- For creating the controller in this module
```shell
nest g co controllers/<controller-name> <name-of-the-module> --flat
```

- For creating the service in this module
```shell
nest g s services/<controller-name> <name-of-the-module> --flat
```


## Branching strategy

- `main` branch : production branch, create a pull request for adding something on it (merge need a 2 persons review agreement, and all the github action workflow verified)
- `develop` branch : development branch, code before the pull-request to the `main` branch (merge need a 1-person review agreement)
- `features/:your_feature` branch : create a branch with the feature you want to create, and after create a pull request to the `develop` branch

## Run in development mode

All the development process is dockerised with volumes, that mean that when you edit your code in local, it is automatically
changed in the container. For launching the development environment, you have to run the script `dev-start-all.sh` and edit
the code as you want.

When you finished the development, you can remove the containers with the command `dev-stop-all.sh`

##### Limitation and evolution perspective

At the beginning of the project, we used a docker-compose in each micro-services. Each docker-compose contained the 
micro-services image, and a database. After resolving some troubles with the volumes, and by the recommendation of teachers,
we move to a centralized docker-compose, containing only one MongoDB database. So, all the microservices are connected
to only one database, and each micro-services ahve an instance of this MongoDB database. 

The problem with our implementation, is that we have to build every time all the images (when we do a `dev-start-all.sh`), in the future, we want to 
create a script that rebuild only the needed images. 

## Run in production mode 

### Production mode for deployment

We created a production mode, and in this one, we ermoved the docker volumes and built the micro-services in a production
mode. For launching the project in production mode, you have to :
1. Launch `build-all.sh` for build the production images
2. Launch `prod-start-all.sh` for launching the docker containers
3. Run `prod-stop-all.sh` for stoping the docker containers

### Production mode for rendering

We add to this version the demonstration of the project, for that, you have to do 2 things
1. Run `prepare.sh` for building production image and launching containers
2. Run `run.sh` for launching the integrations test

## GitHub action 

We created 2 workflows for avoiding bugs and errors on the branches. 

The first workflow only build all images with npm install, for being sure that all the builds
are working and we have no troubles with coding errors

The second workflow build all images with docker, with this workflow, we want to be sure that
the production docker images are working, and we can push them into production


