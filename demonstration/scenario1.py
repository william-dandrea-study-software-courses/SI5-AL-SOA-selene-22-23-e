import time
import requests
import os

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

def scenario1():
    print("\n---------------------- Scenario 1 ----------------------\n")

    print("=> Récupération des positions des astronautes sur la Lune via Astronaut Service")
    print("   US 17 : En tant que Deke, je veux connaitre la position de chaque astronaute sur la Lune")
    print("   On s'attend à trouver Buzz dans le module de commandement, Ellen et Kayla dans les modules de vie Nord et Sud, Jim dans le module d'analyse scientifique et Akihiko et Serguei en exploration dans la zone1")
    print("GET http://localhost:4311/onMoonAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'onMoonAstronauts')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Récupérer les conditions de vie des modules via Survival Control Service ")
    print("   US 1 : En tant que Deke, je veux surveiller les conditions de vie de chaque module")
    print("   On s'attend à recevoir les vitals des 4 modules dont le 512 avec une pression insuffisante")
    print("GET http://localhost:4304/survival-control/supervision")
    print("Response : ")
    response = requests.get(URL_survival_control+'survival-control/supervision')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Isolement d'un module lunaire via Survival Control Service")
    print("   US 4 : En tant que Deke, je veux isoler le module 512 après avoir constaté une pression insuffisante")
    print("PUT http://localhost:4303/module/512/isolate")
    print("Response : ")
    response = requests.put(URL_survival_control+'survival-control/512/isolate')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Récupération des données d'un module lunaire via Module Life Service")
    print("   On veut s'assurer que le module 512 a bien été isolé ")
    print("   On s'attend à ce que le champ isolated du module 512 soit à true et qu'aucun astronaute ne se trouve à l'intérieur")
    print("GET http://localhost:4303/module/512")
    print("Response : ")
    response = requests.get(URL_module_life+'module/512')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Changement du taux de co2 à 100 dans le module 514")
    print("PUT http://localhost:4303/module/514")
    supplies = [{"label": "saucisson","quantity": 2}, {"label": "pates","quantity": 5},{"label": "eau","quantity": 7}]
    payload = {"id_module": 514, "type": "Module d'analyse scientifique", "astronauts": [8,10], "vitals": {"pressure": 3, "co2_rate": 100,"co2_scrubbers_activated":False}, "supplies":supplies, "isolated": True}
    print(payload)
    print("Response : ")
    response = requests.put(URL_module_life+'module/514',json=payload)
    print(response.text + "\n")

    time.sleep(2)

    print("=> Récupération des conditions de vie du module 514 via Module Life Service")
    print("   US 9 : En tant que Jim, je veux que les épurateurs de CO2 s'activent et se désactivent en fonction des niveaux de CO2 dans les modules de la base, afin de garantir un air respirable sans risque pour l'équipage. Par exemple le 514")
    print("   On veut s'assurer que l'épurateur d'air du module 514 s'est bien mis en marche")
    print("   On s'attend à ce que le champ co2_scrubbers_activated du module 514 soit à true car le taux de co2 a subitement augmenté et nécessite que les épurateurs fonctionnent")
    print("GET http://localhost:4303/module/514")
    print("Response : ")
    response = requests.get(URL_module_life+'module/514')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Récupération de l'analyse du danger en provenance de météorites via Meteorite Monitoring Service")
    print("   US 13 : En tant que Deke, je veux suivre les météorites autour de la Lune")
    print("   On s'attend à ce que réponse soit false en effet aucune météorite n'est classée comme dangereuse")
    print("GET http://localhost:4308/meteorite/danger")
    print("Response : ")
    response = requests.get(URL_meteorite_monitoring+'meteorite/danger')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Ajout d'une nouvelle météorite dans Meteorite Monitoring Service")
    print("   Un scientifique à détecter une nouvelle météorite qu'il considère comme dangereuse")
    print("   On s'attend à ce que la base lunaire s'isole")
    print("POST http://localhost:4308/meteorite")
    payload = {"id_meteorite": 6, "dangerous": True}
    print(payload)
    print("Response : ")
    response = requests.post(URL_meteorite_monitoring+'meteorite',json=payload)
    print(response.text + "\n")

    time.sleep(2)

    print("=> Isolement de la base lunaire en cas de nuage de météorite")
    print("   US 14 : En tant que Deke, je veux faire sonner l'alarme de la base lunaire et isoler tous les modules en cas de détection d'un danger")
    print("   On s'attend à ce que le champ alarm_on de la base soit à true")
    print("GET http://localhost:4310/moon-base/1")
    print("Response : ")
    response = requests.get(URL_moon_base+'moon-base/1')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Vérification de l'isolement de tous les modules de la Lune")
    print("   On s'attend à ce que tous les modules soient isolés et que la position de tous les astronautes de la lune soient dans le module sécurisé")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Vérification de la position des astronautes sur la Lune")
    print("   On s'attend à ce que la position de tous les astronautes de la Lune soient dans le module sécurisé")
    print("GET http://localhost:4311/onMoonAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'onMoonAstronauts')
    print(response.text + "\n")

    print("=> Collecte des derniers évènements s'étant produits sur la Lune")
    print("   US 15 : En tant que Marie, je veux être informée et notifiée des événements qui se déroulent dans la base lunaire")
    print("GET http://localhost:4315/news")
    print("Response : ")
    response = requests.get(URL_news+'news')
    print(response.text + "\n")