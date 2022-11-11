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
URL_news_formalisation = 'http://'+ os.environ.get("ALERT_NOTIFICATION_SERVICE_URL_WITH_PORT", 'localhost:4314')+'/'
URL_news = 'http://'+ os.environ.get("MOON_BASE_SERVICE_URL_WITH_PORT", 'localhost:4315')+'/'
URL_spacecraft_monitoring = 'http://'+ os.environ.get("SPACECRAFT_MONITORING_SERVICE_URL_WITH_PORT", 'localhost:4316')+'/'
URL_task_planner = 'http://'+ os.environ.get("TASK_PLANNER_SERVICE_URL_WITH_PORT", 'localhost:4317')+'/'

def scenario3():
    print("---------------------- Scenario 3 ----------------------\n")

    print("=> Récupérer les EVA Missions")
    print("   US 6 : En tant que Buzz, je veux verifier les EVA Missions des prochains jours")
    print("   On s'attend à recevoir 0 eva mission")
    print("GET http://localhost:4307/eva-mission")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("=> Récupérer les tâches planifiées des astronautes")
    print("   US 19 : En tant que Buzz, je veux garder un enregistrement de chaque tâche/mission à laquelle chaque personnel de la base a été affecté")
    print("   On s'attend à recevoir quelques todo")
    print("GET http://localhost:4317/tasks")
    print("Response : ")
    response = requests.get(URL_task_planner+'tasks')
    print(response.text + "\n")

#     print("=> Création d'une EVA Mission")
#     print("   On constate qu'aucune EVA Mission existe et Buzz veut en programmer une pour le 20 janvier")
#     print("POST http://localhost:4307/eva-mission")
#     print("Response : ")
#     payload = {"id_mission": 1, "type":'Mission scientifique', "date_begin":'2022-10-31', "date_end": "undefined", "status":True,"supervisor":"Buzz", "notes":"Aucune", "metrics":[{"id_spacesuit":12, "o2_rate": [],"temperature":[],"pressure":[], "power":[]}]}
#     response = requests.post(URL_eva_mission+'eva-mission', json=payload)
#     print(response.text + "\n")

    print("=> Récupérer les prochaines EVA Missions")
    print("   US 22 : En tant que Marie, je veux avoir accès aux calendriers des missions EVA")
    print("   On s'attend à recevoir 1 eva mission avec une date de début au 20 janvier")
    print("GET http://localhost:4307/eva-mission")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission')
    print(response.text + "\n")

    print("=> Récupération des données d'une combinaison lunaire via SpaceSuit Service")
    print("   US 7 : Jim veut s'assurer de l'état de sa combinaison (la combinaison 1) pour comprendre son état instable")
    print("   On s'attend à ce que la combinaison ait une pression de 3 et 80 d'oxygène")
    print("GET http://localhost:4307/spacesuit/1")
    print("Response : ")
    response = requests.get(URL_spacesuit+'spacesuit/1')
    print(response.text + "\n")

#     print("=> Création d'une EVA Mission")
#     print("   On constate qu'aucune EVA Mission existe et Buzz veut en programmer une pour le 20 janvier")
#     print("POST http://localhost:4307/eva-mission")
#     print("Response : ")
#     payload = {"id_mission": 1, "type":'Mission scientifique', "date_begin":'2022-10-31', "date_end": "undefined", "status":True,"supervisor":"Buzz", "notes":"Aucune", "metrics":[{"id_spacesuit":12, "o2_rate": [],"temperature":[],"pressure":[], "power":[]}]}
#     response = requests.post(URL_eva_mission+'eva-mission', json=payload)
#     print(response.text + "\n")

#     print("=> Création d'une seconde EVA Mission terminée")
#     print("   Voici un exemple de mission scientifique terminée avec métriques")
#     print("POST http://localhost:4307/eva-mission")
#     print("Response : ")
#     payload = {"id_mission": 2, "type":'Mission scientifique', "date_begin":'2022-10-15', "date_end": '2022-10-18', "status":False,"supervisor":"Buzz", "notes":"Aucune", "metrics":[{"id_spacesuit":25, "o2_rate": [94,92,88],"temperature":[25,26,24],"pressure":[3,3.1,2.8], "power":[62,56,48]}]}
#     response = requests.post(URL_eva_mission+'eva-mission', json=payload)
#     print(response.text + "\n")

    print("=> Récupérer les métriques des EVA Missions précédentes")
    print("   US 11 : En tant que Deke, je veux consulter les métriques de l'EVA mission de Jim afin de comprendre l'origine du problème")
    print("   On s'attend à recevoir les métriques de l'EVA mission de Jim, la 1")
    print("GET http://localhost:4307/eva-mission/metrics/1")
    print("Response : ")
    response = requests.get(URL_eva_mission+'eva-mission/metrics/1')
    print(response.text + "\n")

