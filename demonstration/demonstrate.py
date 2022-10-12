import requests
import json
import os
import time
import subprocess

#Fichiers scénarios
import fillDatabase
# import scenario1
# import scenario2
# import scenario3

#Urls des différents micro-services et de la gateway
URL_life_support = "http://" + os.environ.get("LIFE_SUPPORT_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/' 
URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')




print("------------------------------------------------------------------------------------------")

print("\n--------------------------------- Start Integration Tests --------------------------------\n")

print("---------------------------------- End Integration Tests ---------------------------------")


