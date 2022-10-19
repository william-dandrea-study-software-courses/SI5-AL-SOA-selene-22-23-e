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
URL_moon_base = 'http://'+ os.environ.get("MOON_BASE_SERVICE_URL_WITH_PORT", 'localhost:43010')+'/'

def scenario1():
    print("\n---------------------- Scenario 1 ----------------------\n")

    print("---------------------- US 1 ----------------------\n")
    print("=> Récupérer l'état individuel des modules via Survival Control Service")
    print("   En tant que Deke, je veux controler l'état des conditions de vie de chaque module")
    print("   On s'attend à recevoir les 4 modules avec leur vitals")
    print("GET http://localhost:4304/survival-control/supervision/")
    print("Response : ")
    response = requests.get(URL_survival_control+'survival-control/supervision')
    print(response.text + "\n")

    print("=> Récupération des données d'un module lunaire via Survival Control Service")
    print("   On veut s'assurer qu'un seul module est isolé")
    print("   On s'attend à ce que le champ isolated du module 512 soit à false ")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

    print("---------------------- US 4 ----------------------\n")

    print("=> Isolement d'un module lunaire via Survival Control Service")
    print("   En tant que Deke, je veux isoler le module 512 aprés avoir controlé les vitals")
    print("PUT http://localhost:4304/supervision/:idModule/isolate")
    print("Response : ")
    response = requests.put(URL_survival_control+'survival-control/512/isolate')
    print(response.text + "\n")

    print("=> Récupération des données d'un module lunaire via Survival Control Service")
    print("   On veut s'assurer que le module 512 a bien été isolé")
    print("   On s'attend à ce que le champ isolated du module 512 soit à true ")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module/512')
    print(response.text + "\n")

    print("---------------------- US 13 ----------------------\n")
    print("=> Récupération des données d'un module lunaire via Meteorite Monitoring Service")
    print("   On veut s'assurer que la base lunaire n'est pas menacée par des météorites")
    print("   On s'attend à ce que réponse soit false en effet aucune météorite n'est classée comme dangereuse")
    print("GET http://localhost:4308/meteorite/danger")
    print("Response : ")
    response = requests.get(URL_meteorite_monitoring+'meteorite/danger')
    print(response.text + "\n")

    print("---------------------- US 14 ----------------------\n")
    print("=> Ajout d'une nouvelle météorite dans Meteorite Monitoring Service")
    print("   Un scientifique à détecter une nouvelle météorite qu'il considère comme dangereuse")
    print("   On s'attend à ce que la base lunaire s'isole")
    print("POST http://localhost:4308/meteorite")
    print("Response : ")
    payload = {"id_meteorite": 6, "dangerous": True}
    response = requests.post(URL_meteorite_monitoring+'meteorite',json=payload)
    print(response.text )

    print("=> Petite attente pour récupérer l'event")
    time.sleep(1)
    print("=> Isolement de la base lunaire en cas de nuage de météorite")
    print("   En tant que Deke, je veux faire sonner l'alarme de la base lunaire et isoler tous les modules car j'ai détecté un danger")
    print("   On s'attend à ce que le champ alarm_on de la base soit à true et que tous les modules soient isolés ")
    print("GET http://localhost:4310/moon-base/1")
    print("Response : ")
    response = requests.get(URL_moon_base+'moon-base/1')
    print(response.text)
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

