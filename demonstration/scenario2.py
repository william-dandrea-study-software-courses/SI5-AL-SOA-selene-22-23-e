import requests
import os
import json
import time

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

def scenario2():
    print("---------------------- Scenario 2 ----------------------\n")

    print("=> R??cup??ration de l'inventaire de la base lunaire via Module Life Service")
    print("   US 5 : En tant que Jim, je veux contr??ler l'inventaire de la base lunaire")
    print("   On s'attend ?? r??cup??rer un objet avec plusieurs types de provisions")
    print("GET http://localhost:4310/moon-base/inventory")
    print("Response : ")
    response = requests.get(URL_moon_base+'moon-base/inventory')
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??rer la liste des besoins des modules via Needs Control Service")
    print("   US 3 : En tant que Buzz, je veux r??cup??rer tous les besoins des modules ainsi que les besoins de la base lunaire")
    print("   On s'attend ?? recevoir un objet demandant 102 saucissons, 40 p??tes et 12 d'eau")
    print("GET http://localhost:4302/needs-control/moduleNeeds")
    print("Response : ")
    response = requests.get(URL_needs_control+'needs-control/moduleNeeds')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Envoyer une commande ?? la terre via needs control service")
    print("   En tant que Buzz, je veux envoyer 1 commande au Resupply Service, de 10 saucissons, 150 p??tes et 200 d'eau")
    print("POST http://localhost:4302/needs-control/sendOrder")
    body = { "supplies": [{"label": "saucisson","quantity": 10}, {"label": "pates","quantity": 150},{"label": "eau","quantity": 200}]}
    print(body)
    print("Response : ")
    response = requests.post(URL_needs_control+'needs-control/sendOrder',json=body)
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des commandes de la base lunaire via Resupply Service")
    print("   US 2 :En tant que Dorothy, je veux voir toutes les commandes pass??es")
    print("   On s'attend ?? voir la commande pass??e par Buzz pr??c??demment. Elle sera en statut En attente de validation")
    print("GET http://localhost:4301/resupply/supplyOrders")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/supplyOrders')
    id = response.json()[0].get("_id")
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des missions de ravitaillement via Resupply Service")
    print("   US 2 :En tant que Dorothy, je veux controler les missions de ravitaillement")
    print("   On s'attend ?? n'avoir aucune mission de ravitaillement car aucune mission n'a ??t?? lanc??e et aucune commande n'a ??t?? valid??e")
    print("GET http://localhost:4301/resupply/resupplyMission")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Validation d'une commande via Resupply Service")
    print("   US 2 :En tant que Dorothy, je veux valider une commande pass??e par la base lunaire")
    print("   On valide la premi??re commande de Buzz, celle avec 13 provisions demand??es et on s'attend ?? r??cup??rer un Commande valid??e")
    print("PUT http://localhost:4301/resupply/:idCommande/validate")
    print("Response : ")
    response = requests.put(URL_resupply+'resupply/'+id+'/validate')
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration de la commande via Resupply Service")
    print("   US 2 :En tant que Dorothy, je veux m'assurer que la commande a ??t?? bien ??t?? valid??e")
    print("   Cette fois, on s'attend toujours ?? r??cup??rer la commande mais son statut sera pass??e en Valid??")
    print("GET http://localhost:4301/resupply/supplyOrders")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/supplyOrders')
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des missions de ravitaillement via Resupply Service")
    print("   US 2 :En tant que Dorothy, je veux controler les missions de ravitaillement")
    print("   On s'attend cette fois ?? retrouver une seule mission de ravitaillement qui contient la commande de 13 provisions. Cette commande sera En cours de traitement")
    print("GET http://localhost:4301/resupply/resupplyMission")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    id_resupplyMission = response.json()[0].get("_id")
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des astronautes sur la Terre")
    print("   On s'attend ?? trouver les astronautes 1 ?? 5")
    print("GET http://localhost:4311/astronaut/onEarthAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'onEarthAstronauts')
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des astronautes sur la Lune")
    print("   On s'attend ?? trouver les astronautes 6 ?? 11")
    print("GET http://localhost:4311/astronaut/onMoonAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'onMoonAstronauts')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Affectation de nouvelles missions de roulement des astronautes")
    print("   US 16 : En tant que Gene, je veux faire voler des astronautes de la Terre ?? la Lune et inversement")
    print("   On cr???? une premi??re mission Terre-Lune avec les astronautes terriens et une deuxi??me mission Lune-Terre avec les astronautes lunaires except?? Buzz")
    print("POST http://localhost:4312/rotation-mission")
    payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [1,2,3,4,5]}
    print(payload)
    print("Response : ")
    response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
    id_rotationMission1 = response.json().get("_id")
    print(response.text)
    payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [7,8,9,10,11]}
    response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
    id_rotationMission2 = response.json().get("_id")
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration des vaisseaux disponibles pour une mission de ravitaillement et des missions de roulements via Spacecraft Service")
    print("   US 8 : En tant que Gene, je veux regarder tous les vaisseaux disponibles")
    print("   On s'attend ?? trouver des vaisseaux disponibles qui n'ont aucune mission de ravitaillement et qui sont au sol.")
    print("GET http://localhost:4305/spacecraft")
    print("Response : ")
    response = requests.get(URL_spacecraft+'spacecraft')
    id_spacecraft = "1"
    print(response.text + "\n")

    time.sleep(2)

    print("=> Attribution d'une mission de ravitaillement ?? un vaisseau via Spacecraft Service")
    print("   US 18 : En tant que Gene, je veux entretenir la base lunaire avec un nombre limit?? de vaisseaux spatiaux r??utilisables")
    print("   On s'attend ?? trouver l'id de la mission chang?? et l'id du vaisseau de la mission chang??")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraft/affectSpaceCraftToResupplyMission")
    payload = { "id_Mission": id_resupplyMission}
    print(payload)
    print("Response : ")
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToResupplyMission",json=payload)
    print(response.text)
    print("GET http://localhost:4301/resupply/resupplyMission")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Affectation d'un vaisseau aux missions de roulements")
    print("   US 18 : En tant que Gene, je veux entretenir la base lunaire avec un nombre limit?? de vaisseaux spatiaux r??utilisables")
    print("   On affecte d'abord la premi??re mission et ensuite la deuxi??me, on s'attend ?? trouver les missions dans l'ordre")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraft/affectSpaceCraftToRotationMission")
    print("Response : ")
    payload = { "id_Mission": id_rotationMission1}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToRotationMission",json=payload)
    print(response.text)
    payload = { "id_Mission": id_rotationMission2}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToRotationMission",json=payload)
    print(response.text)
    print("GET http://localhost:4312/rotation-mission")
    print("Response : ")
    response = requests.get(URL_rotation_mission+'rotation-mission')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Envoi d'un vaisseau via Spacecraft Service")
    print("   US 8 : En tant que Gene, je veux controler le lancement des vaisseaux")
    print("   On s'attend ?? trouver le status du vaisseau ?? envoy??, le statut de la mission ?? en cours d'acheminement et le statut des astronautes ?? ON_TRANSIT")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf/launch")
    print("Response : ")
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/launch")
    print(response.text)
    time.sleep(2)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text)
    response = requests.get(URL_astronaut+'astronaut')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Explosion du vaisseau en plein vol")
    print("   On s'attend ?? trouver le status du vaisseau ?? Damaged, le statut de la mission ?? en cours de traitement et les astronautes sont d??c??d??s")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf")
    print("Response : ")
    payload = { "id_spacecraft": 1, "vitals": False, "status": "Endommag??", "id_resupplyMission": id_resupplyMission }
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft, json=payload)
    print(response.text)
    time.sleep(2)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text)
    response = requests.get(URL_astronaut+'astronaut')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Suivi des fus??es en vol")
    print("   US 20 : En tant que Jim, je veux ??tre inform?? chaque fois qu'une mission de r??approvisionnement est retard??e ou ??chou??e")
    print("   On s'attend ?? trouver le vaisseau 1 dans les vaisseaux endommag??s")
    print("GET http://localhost:4316/spacecraft/crashed")
    print("Response : ")
    response = requests.get(URL_spacecraft_monitoring+"spacecraft/crashed")
    print(response.text+ "\n")

    time.sleep(2)

    print("=> Reattribution d'une mission de ravitaillement ?? un vaisseau via Spacecraft Service")
    print("   US 14 : En tant que Gene, je veux pouvoir attribuer un nouveau vaisseau pour lancer la mission de r??approvisionnement lorsque la pr??c??dente ??choue")
    print("   On s'attend ?? trouver l'id de la mission inchang?? et l'id du vaisseau de la mission chang??")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraft")
    print("Response : ")
    id_spacecraft = "2"
    payload = { "id_Mission": id_resupplyMission}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToResupplyMission",json=payload)
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    time.sleep(2)

    print("=> Envoi d'un vaisseau via Spacecraft Service")
    print("   En tant que Gene, je veux envoyer un nouveau vaisseau")
    print("   On s'attend ?? trouver le status du vaisseau 2 ?? envoy?? et le statut de la mission ?? en cours d'acheminement")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf/launch")
    print("Response : ")
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/launch")
    print(response.text)
    time.sleep(2)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    time.sleep(2)

    print("PUT http://localhost:4305/spacecraft/:idSpacecraf")
    print("Response : ")
    payload = { "id_spacecraft": 2, "vitals": True, "status": "En approche", "id_resupplyMission": id_resupplyMission}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft, json=payload)
    print(response.text+ "\n")

    time.sleep(4)

    print("=> Suivi des fus??es en vol")
    print("   US 25 : En tant que Jim, je veux ??tre inform?? lorsqu'un vaisseau spatial de ravitaillement est sur le point d'atterrir")
    print("   On s'attend ?? voir le vaisseau num??ro 2 sur le point d'arriver")
    print("GET http://localhost:4316/spacecraft/arriving")
    print("Response : ")
    response = requests.get(URL_spacecraft_monitoring+'spacecraft/arriving')
    print(response.text+ "\n")

    time.sleep(2)

    print("PUT http://localhost:4305/spacecraft/:idSpacecraf")
    print("Response : ")
    payload = { "id_spacecraft": 2, "vitals": True, "status": "Arriv??", "id_resupplyMission": id_resupplyMission}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft, json=payload)
    print(response.text+ "\n")

    time.sleep(4)

    print("=> Suivi des fus??es en vol")
    print("   Gene s'informe de l'arriv??e du vaisseau")
    print("   On s'attend ?? voir le vaisseau num??ro 2 ayant aluni et ayant disparu de la liste des vaisseaux en train d'arriver, l'??tat du vaisseau change ??galement")
    print("GET http://localhost:4316/spacecraft/landed")
    print("Response : ")
    response = requests.get(URL_spacecraft_monitoring+'spacecraft/landed')
    print(response.text)
    print("GET http://localhost:4316/spacecraft/arriving")
    print("Response : ")
    response = requests.get(URL_spacecraft_monitoring+'spacecraft/arriving')
    print(response.text)
    print("GET http://localhost:4305/spacecraft")
    print("Response : ")
    response = requests.get(URL_spacecraft+'spacecraft')
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??approvisionnement de la base lunaire par Jim")
    print("   On s'attend ?? voir le vaisseau num??ro 2 ayant aluni et ayant disparu de la liste des vaisseaux en train d'arriver, l'??tat du vaisseau change ??galement")
    print("POST http://localhost:4310/moon-base/1/supply")
    payload = [{"label": "saucisson","quantity": 10}, {"label": "pates","quantity": 150},{"label": "eau","quantity": 200}]
    print(payload)
    response = requests.post(URL_moon_base+'moon-base/1/supply',json=payload)
    print(response.text + "\n")

    time.sleep(2)

    print("=> R??cup??ration de l'inventaire de la base lunaire via Module Life Service")
    print("   US 5 : En tant que Jim, je veux contr??ler l'inventaire de la base lunaire")
    print("   On s'attend ?? r??cup??rer un objet avec plusieurs types de provisions toutes enti??res remplies")
    print("GET http://localhost:4310/moon-base/inventory")
    print("Response : ")
    response = requests.get(URL_moon_base+'moon-base/inventory')
    print(response.text + "\n")
