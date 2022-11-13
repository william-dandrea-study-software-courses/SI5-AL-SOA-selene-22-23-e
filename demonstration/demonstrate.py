import requests
import json
import os
import time
import subprocess

#Fichiers scénarios
from fillDatabase import *
from scenario1 import *
from scenario2 import *
from scenario3 import *

#Urls des différents micro-services et de la gateway
URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_survival_control = "http://" + os.environ.get("SURVIVAL_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_spacecraft = "http://" + os.environ.get("SPACECRAFT_SERVICE_URL_WITH_PORT", 'localhost:4305')+'/'
URL_spacesuit = 'http://'+ os.environ.get("SPACESUIT_SERVICE_URL_WITH_PORT", 'localhost:4306')+'/'
URL_eva_mission = 'http://'+ os.environ.get("EVA_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4307')+'/'
URL_meteorite_monitoring = 'http://'+ os.environ.get("METEORITE_MONITORING_SERVICE_URL_WITH_PORT", 'localhost:4308')+'/'
URL_alert_notification = 'http://'+ os.environ.get("ALERT_NOTIFICATION_SERVICE_URL_WITH_PORT", 'localhost:4309')+'/'
URL_moon_base = 'http://'+ os.environ.get("MOON_BASE_SERVICE_URL_WITH_PORT", 'localhost:4310')+'/'
URL_astronaut = 'http://'+ os.environ.get("ASTRONAUT_SERVICE_URL_WITH_PORT", 'localhost:4311')+'/'
URL_rotation_mission = 'http://'+ os.environ.get("ROTATION_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4312')+'/'
URL_spacesuit_monitoring = 'http://'+ os.environ.get("SPACESUIT_MONITORING_SERVICE_URL_WITH_PORT", 'localhost:4313')+'/'
URL_news_formalisation = 'http://'+ os.environ.get("NEWS_FORMALISATION_SERVICE_URL_WITH_PORT", 'localhost:4314')+'/'
URL_news = 'http://'+ os.environ.get("NEWS_SERVICE_URL_WITH_PORT", 'localhost:4315')+'/'
URL_spacecraft_monitoring = 'http://'+ os.environ.get("SPACECRAFT_MONITORING_SERVICE_URL_WITH_PORT", 'localhost:4316')+'/'
URL_task_planner = 'http://'+ os.environ.get("TASK_PLANNER_SERVICE_URL_WITH_PORT", 'localhost:4317')+'/'

URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')



print("------------------------------------------------------------------------------------------")
initializeIntegrationTests()
print("\n--------------------------------- Start Integration Tests --------------------------------\n")
scenario1()
time.sleep(5)
scenario2()
time.sleep(5)
scenario3()
print("---------------------------------- End Integration Tests ---------------------------------")


