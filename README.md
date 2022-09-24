# Project MicroServices SOA - Team E

## Contributors
- Arthur Soens
- Emma Glesser
- Laurie Fernandez
- William D'Andrea


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

- `main` branch : production branch, create a pull request for adding something on it
- `develop` branch : development branch, code before the pull-request to the `main` branch
- `features/:your_feature` branch : create a branch with the feature you want to create, and after create a pull request to the `develop` branch

## Run in development mode

For running one module in development mode use : ```./run-dev.sh```
