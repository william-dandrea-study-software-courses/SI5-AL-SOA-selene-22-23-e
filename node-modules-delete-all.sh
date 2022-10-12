function delete_npm()  # $1 is the dir to get it
{
    cd $1
    rm -rf node_modules
    cd ..
}

delete_npm "eva-mission-service"
delete_npm "gateway"
delete_npm "module-life-service"
delete_npm "needs-control-service"
delete_npm "resupply-service"
delete_npm "spacecraft-service"
delete_npm "spacesuit-service"
delete_npm "survival-control-service"
