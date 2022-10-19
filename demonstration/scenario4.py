import requests
import os

URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_survival_control = "http://" + os.environ.get("SURVIVAL_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_spacecraft = "http://" + os.environ.get("SPACECRAFT_SERVICE_URL_WITH_PORT", 'localhost:4305')+'/'
URL_spacesuit = 'http://'+ os.environ.get("SPACESUIT_SERVICE_URL_WITH_PORT", 'localhost:4306')+'/'
URL_eva_mission = 'http://'+ os.environ.get("EVA_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4307')+'/'


def scenario4() :
    print("\n---------------------- Scenario 4 ----------------------\n")

    print("---------------------- US 9 ----------------------\n")
    print("=> Récupération des données d'un module lunaire via Vitals Module")
    print("   En tant que Jim, je veux que les épurateurs de CO2 s'activent et se désactivent en fonction des niveaux de CO2 dans les modules de la base, afin de garantir un air respirable sans risque pour l'équipage. Par exemple le 514")
    print("GET http://localhost:4303/module")
    print("   On s'attend à ce que le champ co2_rate du module 514 soit à 20 ")
    print("   On s'attend à ce que le champ co2_scrubbers_activated du module 514 soit à false")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

    print("=> Changement du taux de co2 à 100 dans le module 514")
    print("PUT http://localhost:4303/module/:idModule")
    print("Response : ")
    payload = {"id_module": 514, "vitals": {"co2_rate": 100,"co2_scrubbers_activated":False}, "supplies":9, "isolated": True}
    response = requests.put(URL_module_life+'module/514''/',json=payload)
    print(response.text + "\n")

    print("=> Récupération des données d'un module lunaire via Survival Control Service")
    print("   On veut s'assurer que l'épurateur d'air du module 514 s'est bien mis en marche")
    print("   On s'attend à ce que le champ co2_scrubbers_activated du module 514 soit à true")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")
