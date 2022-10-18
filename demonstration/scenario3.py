import requests
import os

URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_survival_control = "http://" + os.environ.get("SURVIVAL_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_spacecraft = "http://" + os.environ.get("SPACECRAFT_SERVICE_URL_WITH_PORT", 'localhost:4305')+'/'
URL_spacesuit = 'http://'+ os.environ.get("SPACESUIT_SERVICE_URL_WITH_PORT", 'localhost:4306')+'/'
URL_eva_mission = 'http://'+ os.environ.get("EVA_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4307')+'/'

def scenario3():
    print("---------------------- Scenario 3 ----------------------\n")

    print("---------------------- US 6 ----------------------\n")
    print("=> Récupérer les EVA Missions")
    print("   En tant que Buzz, je veux verifier les EVA Missions des prochains jours")
    print("   On s'attend à recevoir 0 eva mission")
    print("GET http://localhost:4307/eva-mission/")
    print(URL_eva_mission+'eva-mission')
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("=> Création d'une EVA Mission")
    print("   On constate qu'aucune EVA Mission existe et Buzz veut en programmer une pour le 20 janvier")
    print("POST http://localhost:4307/eva-mission")
    print("Response : ")
    payload = {"id_mission": 1, "type":'SCIENTIFIC', "date_begin":"31 octobre", "date_end": "undefined", "status":True,"supervisor":"Buzz", "notes":"Aucune", "metrics":["id_spacesuit":12, "o2_rate": [],"temperature":[],"pressure":[], "power":[]}
    response = requests.post(URL_eva_mission+'eva-mission', json=payload)
    print(response.text + "\n")

    print("=> Récupérer les EVA Missions")
    print("   En tant que Buzz, je veux reverifier les EVA Missions des prochains jours")
    print("   On s'attend à recevoir 1 eva mission avec une date de début au 20 janvier")
    print("GET http://localhost:4307/eva-mission/")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("---------------------- US 7 ----------------------\n")
    print("=> Récupération des données d'une combinaison lunaire via SpaceSuit Service")
    print("   Jim veut s'assurer de l'état de sa combinaison (la combinaison 1) pour sortir préparer le départ du rover pour l'EVA, il demande donc à spacesuit service")
    print("   On s'attend à ce que la combinaison ait une pression de 3 et 80 d'oxygne")
    print("GET http://localhost:4307/spacesuit/1")
    print("Response : ")
    response = requests.get(URL_spacesuit+'spacesuit/1')
    print(response.text + "\n")

    print("---------------------- US 11 ----------------------\n")
    print("=> Création d'une seconde EVA Mission terminée")
    print("   Voici un exemple de mission scientifique terminée avec métriques")
    print("POST http://localhost:4307/eva-mission")
    print("Response : ")
    payload = {"id_mission": 2, "type":'SCIENTIFIC', "date_begin":"15 octobre", "date_end": "18 octobre", "status":False,"supervisor":"Buzz", "notes":"Aucune", "metrics":["id_mission":25, "o2_rate": [94,92,88],"temperature":[25,26,24],"pressure":[3,3.1,2.8], "power":[62,56,48]}
    response = requests.post(URL_eva_mission+'eva-mission', json=payload)
    print(response.text + "\n")

    print("=> Récupérer les métriques des EVA Missions précédentes")
    print("   En tant que Deke, je veux verifier les métriques des EVA Missions précédentes pour vérifier qu'il n'y a pas eu des précédents")
    print("   On s'attend à recevoir les métriques pour une seule EVA mission, la 2")
    print("GET http://localhost:4307/eva-mission/metrics")
    print(URL_eva_mission+'eva-mission/metrics')
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission/metrics')
    print(response.text + "\n")

scenario3()