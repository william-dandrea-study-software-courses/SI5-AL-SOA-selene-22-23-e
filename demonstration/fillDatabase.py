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
URL_astronaut = 'http://'+ os.environ.get("ASTRONAUT_SERVICE_URL_WITH_PORT", 'localhost:4311')+'/'
URL_rotation_mission = 'http://'+ os.environ.get("ROTATION_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4312')+'/'

URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

def fillModuleServiceDatabase() :
    print("\n=> Peuplement de la base de données Module Life\n")
    print("Ajout de 4 modules")
    print("  - Inventaire de 32 provisions")
    print("  - Modules isolés : 1 (514) ")
    print("  - Modules en mauvaise situation : 2")
    print("  - Besoins de 8 provisions\n")
    print("POST http://localhost:4303/module")
    supplies = [{"label": "saucisson","quantity": 2}, {"label": "pates","quantity": 5},{"label": "eau","quantity": 7}]
    payload = {"id_module": 512, "type": "Module sécurisé", "astronauts": [], "vitals": {"co2_rate": 100,"co2_scrubbers_activated":True}, "supplies":supplies, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 513, "type": "Module de vie", "astronauts": [6,7,9,11], "vitals": {"co2_rate": 80,"co2_scrubbers_activated":True}, "supplies":supplies, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 514, "type": "Module d'analyse scientifique", "astronauts": [8,10], "vitals": {"co2_rate": 20,"co2_scrubbers_activated":False}, "supplies":supplies, "isolated": True}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 515, "type": "Entrepot", "astronauts": [], "vitals": {"co2_rate": 75,"co2_scrubbers_activated":True}, "supplies":supplies, "isolated": False}
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
    supplies = [{"label": "saucisson","quantity": 30}, {"label": "pates","quantity": 80},{"label": "eau","quantity": 100}]
    payload = {"initialStock": supplies, "id_base": 1, "alarm_on": False, "listOfModuleIds": [512,513,514,515]}
    print(requests.post(URL_moon_base+'moon-base',json=payload).text)

def fillMeteoriteMonitoringDatabase() :
    print("\n=> Peuplement de la base de données Meteorite Monitoring\n")
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

def fillAstronautDatabase():
    print("\n=> Peuplement de la base de données Astronaut\n")
    print("Ajout de 10 astronautes")
    print("POST http://localhost:4311/astronaut")
    payload = {"id_astronaut":1,"name":"Megan","isDead":False,"job":"Astronaute","planet":"Terre","location":"Zone d'embarquement"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":2,"name":"Thomas","isDead":False,"job":"Astronaute","planet":"Terre","location":"Zone d'embarquement"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":3,"name":"Samantha","isDead":False,"job":"Astronaute","planet":"Terre","location":"Zone d'embarquement"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":4,"name":"Oleg","isDead":False,"job":"Astronaute","planet":"Terre","location":"Zone d'embarquement"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":5,"name":"Peggy","isDead":False,"job":"Astronaute","planet":"Terre","location":"Zone d'embarquement"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":6,"name":"Buzz","isDead":False,"job":"Commandant de Moon Base","planet":"Lune","location":"Module de commandement de la base"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":7,"name":"Ellen","isDead":False,"job":"Astronaute","planet":"Lune","location":"Modules de vie Nord"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":8,"name":"Jim","isDead":False,"job":"Astronaute","planet":"Lune","location":"Modules d'analyse scientifique"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":9,"name":"Kayla","isDead":False,"job":"Astronaute","planet":"Lune","location":"Modules de vie Nord"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":10,"name":"Akihiko","isDead":False,"job":"Astronaute","planet":"Lune","location":"Modules d'analyse scientifique"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)
    payload = {"id_astronaut":11,"name":"Serguei","isDead":False,"job":"Astronaute","planet":"Lune","location":"Modules de vie Nord"}
    print(requests.post(URL_astronaut+'astronaut',json=payload).text)

def initializeIntegrationTests() :
    fillAstronautDatabase()
    fillModuleServiceDatabase()
    fillSpacesuitDatabase()
    fillSpacecratDatabase()
    fillMoonBaseDatabase()
    fillMeteoriteMonitoringDatabase()
