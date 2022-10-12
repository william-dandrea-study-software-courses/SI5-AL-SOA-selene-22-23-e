

function run_install()  # $1 is the dir to get it
{
    cd $1
    npm install
    cd ..
}

run_install "eva-mission-service"
run_install "gateway"
run_install "module-life-service"
run_install "needs-control-service"
run_install "resupply-service"
run_install "spacecraft-service"
run_install "spacesuit-service"
run_install "survival-control-service"
