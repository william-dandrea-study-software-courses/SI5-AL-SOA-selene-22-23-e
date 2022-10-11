import requests
import os

URL_spacesuit = "http://" + os.environ.get("SPACESUIT_SERVCE_URL_WITH_PORT", 'localhost:4306')+'/'
URL_eva_mission = "http://" + os.environ.get("EVA_MISSION_SERVCE_URL_WITH_PORT", 'localhost:4307')+'/'

def scenario3():
    print("---------------------- Scenario 3 ----------------------\n")
    print("=> Récupérer les EVA Missions")
    print("   En tant que Buzz, je veux verifier les EVA Missions des prochains jours")
    print("   On s'attend à recevoir 0 eva mission")
    print("GET http://localhost:4307/eva-mission/")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("=> Création d'une EVA Mission")
    print("   On constate qu'aucune EVA Mission existe et Buzz veut en programmer une pour le 20 janvier")
    print("POST http://localhost:4307/eva-mission")
    print("Response : ")
    print("Response : ")
    payload = {"id_mission": 1, "date_begin":"20 janvier", "date_end": "undefined", "status":True,"supervisor":"Buzz", "notes":"Aucune"}
    response = requests.post(URL_eva_mission+'eva-mission', json=payload)
    print(response.text + "\n")

    print("=> Récupérer les EVA Missions")
    print("   En tant que Buzz, je veux reverifier les EVA Missions des prochains jours")
    print("   On s'attend à recevoir 1 eva mission avec une date de début au 20 janvier")
    print("GET http://localhost:4307/eva-mission/")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("=> Récupération des données d'une combinaison lunaire via SpaceSuit Service")
    print("   Jim veut s'assurer de l'état de sa combinaison (la combinaison 1), il demande donc à spacesuit service")
    print("   On s'attend à ce que la combinaison ait une pression de 3 et 80 d'oxygne")
    print("GET http://localhost:4307/spacesuit/1")
    print("Response : ")
    response = requests.get(URL_spacesuit+'spacesuit/1')
    print(response.text + "\n")

scenario3()