import requests
import json
import os
import time
import subprocess

#Urls des différents micro-services et de la gateway
URL_life_support = "http://" + os.environ.get("LIFE_SUPPORT_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_spacesuit = 'http://'+ os.environ.get("SPACESUIT_SERVICE_URL_WITH_PORT", 'localhost:4306')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/'
URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

idModule = 512

def fillModuleServiceDatabase() :
    print("=> Peuplement de la base de données\n")
    print("Ajout de 4 modules pour un quota de provisions max à 10:")
    print("  - Inventaire de 32 provisions")
    print("  - Modules isolés : 1 (514) ")
    print("  - Modules en mauvaise situation : 2")
    print("  - Besoins de 8 provisions\n")
    print("POST http://localhost:4303/module")
    payload = {"id_module": idModule, "vitals": {"co2_rate": 100,"co2_scrubbers_activated":True}, "supplies":10, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 513, "vitals": {"co2_rate": 80,"co2_scrubbers_activated":True}, "supplies":7, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 514, "vitals": {"co2_rate": 100,"co2_scrubbers_activated":False}, "supplies":9, "isolated": True}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 515, "vitals": {"co2_rate": 75,"co2_scrubbers_activated":True}, "supplies":6, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)

def fillSpaceSuitDatabase() :
    print("=> Peuplement de la base de données\n")
    print("Ajout d'une combinaison numéro 1 avec:")
    print("  - 20 de temperature")
    print("  - 3 de pression ")
    print("  - 80 de taux d'oxygene")
    print("  - 60 de rythme cardiaque\n")
    print("POST http://localhost:4306/module")
    payload = {"id_spacesuit": 1, "cardiac_rythm": 60, "o2_rate":80, "temperature": 20, "pressure":3, "power":100}
    print(requests.post(URL_spacesuit+'spacesuit',json=payload).text)

fillModuleServiceDatabase()

fillSpaceSuitDatabase()