import requests
import json
import os
import time
import subprocess

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

URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

idModule = 512

def fillModuleServiceDatabase() :
    print("\n=> Peuplement de la base de données Module Life\n")
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
    payload = {"id_module": 514, "vitals": {"co2_rate": 20,"co2_scrubbers_activated":False}, "supplies":9, "isolated": True}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 515, "vitals": {"co2_rate": 75,"co2_scrubbers_activated":True}, "supplies":6, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)

def fillSpacesuitDatabase() :
    print("\n=> Peuplement de la base de données Spacesuit\n")
    print("Ajout d'une combinaison numéro 1 avec:")
    print("  - 20 de temperature")
    print("  - 3 de pression ")
    print("  - 80 de taux d'oxygene")
    print("  - 60 de rythme cardiaque\n")
    print("POST http://localhost:4306/module")
    payload = {"id_spacesuit": 1, "cardiac_rythm": 60, "o2_rate":80, "temperature": 20, "pressure":3, "power":100}
    print(requests.post(URL_spacesuit+'spacesuit',json=payload).text)

def fillSpacecratDatabase() :
    print("\n=> Peuplement de la base de données Spacecraft\n")
    print("Ajout de 2 vaisseaux 2 avec:")
    print("  - des bonnes conditions matérielles ")
    print("  - status à PREPARING")
    print("  - aucune mission de ravitaillement lié\n")
    print("POST http://localhost:4305/spacecraft")
    payload = { "id_spacecraft": 1, "vitals": True, "status": "Au sol", "id_resupplyMission": "None"}
    print(requests.post(URL_spacecraft+'spacecraft',json=payload).text)
    payload = { "id_spacecraft": 2, "vitals": True, "status": "Au sol", "id_resupplyMission": "None"}
    print(requests.post(URL_spacecraft+'spacecraft',json=payload).text)

def fillMoonBaseDatabase() :
    print("\n=> Peuplement de la base de données Moon Base\n")
    print("Ajout d'une base lunaire 1 ")
    print("POST http://localhost:4310/moon-base")
    payload = {"initialStock": 100, "id_base": 1, "alarm_on": False, "listOfModuleIds": [512,513,514,515]}
    print(requests.post(URL_moon_base+'moon-base',json=payload).text)

def fillMeteoriteMonitoringDatabase() :
    print("\n=> Peuplement de la base de données Meteorite Monitoring e\n")
    print("Ajout de 5 meteorites inoffensives")
    print("POST http://localhost:4308/meteorite")
    payload = {"id_meteorite": 1, "dangerous": False}
    print(requests.post(URL_meteorite_monitoring+'meteorite',json=payload).text)
    payload = {"id_meteorite": 2, "dangerous": False}
    print(requests.post(URL_meteorite_monitoring+'meteorite',json=payload).text)
    payload = {"id_meteorite": 3, "dangerous": False}
    print(requests.post(URL_meteorite_monitoring+'meteorite',json=payload).text)
    payload = {"id_meteorite": 4, "dangerous": False}
    print(requests.post(URL_meteorite_monitoring+'meteorite',json=payload).text)
    payload = {"id_meteorite": 5, "dangerous": False}
    print(requests.post(URL_meteorite_monitoring+'meteorite',json=payload).text)


def initializeIntegrationTests() :
    fillModuleServiceDatabase()
    fillSpacesuitDatabase()
    fillSpacecratDatabase()
    fillMeteoriteMonitoringDatabase()
    fillMoonBaseDatabase()

fillMoonBaseDatabase()
