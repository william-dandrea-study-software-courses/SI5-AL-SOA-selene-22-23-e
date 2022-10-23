import requests
import os
import json

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
URL_astronaut = 'http://'+ os.environ.get("ASTRONAUT_SERVICE_URL_WITH_PORT", 'localhost:4311')+'/'
URL_rotation_mission = 'http://'+ os.environ.get("ROTATION_MISSION_SERVICE_URL_WITH_PORT", 'localhost:4312')+'/'

URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

def scenario2():
    print("---------------------- Scenario 2 ----------------------\n")

    print("---------------------- US 5 ----------------------\n")
    print("=> Récupération de l'inventaire de la base lunaire via Module Life Service")
    print("   En tant que Jim, je veux contrôler l'inventaire de la base lunaire")
    print("   On s'attend à récupérer un objet avec le champ quantity à 132 car les modules possèdent respectivement 10, 7, 9 et 6 provisions et la base un stock de 100")
    print("GET http://localhost:4303/inventory")
    print("Response : ")
    response = requests.get(URL_moon_base+'moon-base/inventory')
    print(response.text + "\n")

    print("---------------------- US 3 ----------------------\n")
    print("=> Récupérer la liste des besoins des modules via Needs Control Service")
    print("   En tant que Buzz, je veux récupérer tous les besoins des modules ainsi que les besoins de la base lunaire")
    print("   On s'attend à recevoir un objet avec le champ quantity à 8 car il manque respectivement 0, 3, 1 et 4 provisions à chaque module pour atteindre le stock maximal et la base est déjà à son maximum")
    print("GET http://localhost:4302/needs-control/moduleNeeds")
    print("Response : ")
    response = requests.get(URL_needs_control+'needs-control/moduleNeeds')
    print(response.text + "\n")

    print("=> Envoyer une commande à la terre via needs control service")
    print("   En tant que Buzz, je veux envoyer 2 commandes au Resupply Service, une de 13 objets et une autre de 26")
    print("POST http://localhost:4302/needs-control/sendOrder")
    print("Body :")
    body = {"quantity":13}
    print(body)
    print("Response : ")
    response = requests.post(URL_needs_control+'needs-control/sendOrder',json=body)
    print(response.text + "\n")

    print("POST http://localhost:4302/needs-control/sendOrder")
    print("Body :")
    body = {"quantity":26}
    print(body)
    print("Response : ")
    response = requests.post(URL_needs_control+'needs-control/sendOrder',json=body)
    print(response.text + "\n")

    print("---------------------- US 2 ----------------------\n")
    print("=> Récupération des commandes de la base lunaire via Resupply Service")
    print("   En tant que Dorothy, je veux voir toutes les commandes passées")
    print("   On s'attend à voir les deux commandes de 13 et 26 provisions passées par Buzz précédemment. Elles seront toutes les deux en En cours de traitement ")
    print("GET http://localhost:4301/resupply/supplyOrders")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/supplyOrders')
    id = response.json()[0].get("_id")
    print(response.text + "\n")

    print("=> Récupération des missions de ravitaillement via Resupply Service")
    print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
    print("   On s'attend à n'avoir aucune mission de ravitaillement car aucune mission n'a été lancée et aucune commande n'a été validée")
    print("GET http://localhost:4301/resupply/resupplyMission")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    print("=> Validation d'une commande via Resupply Service")
    print("   En tant que Dorothy, je veux valider une commande passée par la base lunaire")
    print("   On valide la première commande de Buzz, celle avec 13 provisions demandées et on s'attend à récupérer un Commande validée")
    print("PUT http://localhost:4301/resupply/:idCommande/validate")
    print("Response : ")
    response = requests.put(URL_resupply+'resupply/'+id+'/validate')
    print(response.text + "\n")

    print("=> Récupération de la commande via Resupply Service")
    print("   En tant que Dorothy, je veux m'assurer que la commande a été bien été validée")
    print("   Cette fois, on s'attend toujours à récupérer les deux commandes de Buzz mais la première sera passée en Validé")
    print("GET http://localhost:4301/resupply/supplyOrders")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/supplyOrders')
    print(response.text + "\n")

    print("=> Récupération des missions de ravitaillement via Resupply Service")
    print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
    print("   On s'attend cette fois à retrouver une seule mission de ravitaillement qui contient la commande de 13 provisions. Cette commande sera En cours de traitement")
    print("GET http://localhost:4301/resupply/resupplyMission")
    print("Response : ")
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    id_resupplyMission = response.json()[0].get("_id")
    print(response.text + "\n")

    print("---------------------- US 16 ----------------------\n")
    print("=> Récupération des astronautes sur la Terre")
    print("   On s'attend à trouver les astronautes 1 à 5")
    print("GET http://localhost:4311/astronaut/onEarthAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'astronaut/onEarthAstronauts')
    print(response.text + "\n")

    print("=> Récupération des astronautes sur la Lune")
    print("   On s'attend à trouver les astronautes 6 à 11")
    print("GET http://localhost:4311/astronaut/onMoonAstronauts")
    print("Response : ")
    response = requests.get(URL_astronaut+'astronaut/onMoonAstronauts')
    print(response.text + "\n")

    print("=> Affectation de nouvelles missions de roulement des astronautes")
    print("   En tant que Gene, je veux faire voler des astronautes de la Terre à la Lune et inversement")
    print("   On créé une première mission Terre-Lune avec les astronautes terriens et une deuxième mission Lune-Terre avec les astronautes lunaires excepté Buzz")
    print("POST http://localhost:4312/rotation-mission")
    print("Response : ")
    payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [1,2,3,4,5]}
    response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
    print(response.text + "\n")
    payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [7,8,9,10,11]}
    response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
    print(response.text + "\n")

    print("---------------------- US 8 ----------------------\n")
    print("=> Récupération des vaisseaux disponibles pour une mission de ravitaillement et des missions de roulements via Spacecraft Service")
    print("   En tant que Gene, je veux regarder tous les vaisseaux disponibles")
    print("   On s'attend à trouver un seul vaisseau qui n'a aucune mission de ravitaillement et qui est au sol")
    print("GET http://localhost:4305/spacecraft")
    print("Response : ")
    response = requests.get(URL_spacecraft+'spacecraft')
    id_spacecraft = "1"
    print(response.text + "\n")

    print("=> Attribution d'une mission de ravitaillement à un vaisseau via Spacecraft Service")
    print("   En tant que Gene, je veux attribuer un vaisseau à une mission de ravitaillement")
    print("   On s'attend à trouver l'id de la mission changé et l'id du vaisseau de la mission changé")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraft")
    print("Response : ")
    payload = { "id_resupplyMission": id_resupplyMission}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToMission",json=payload)
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

#     print("=> Affectation d'un vaisseau aux missions de roulements")
#     print("   En tant que Gene, je veux faire voler des astronautes de la Terre à la Lune et inversement")
#     print("   On affecte d'abord la première mission et ensuite la deuxième, on s'attend à trouver les missions dans l'ordre")
#     print("POST http://localhost:4305/spacecraft/:spacecraftId/affectSpaceCraftToRotationMission")
#     print("Response : ")
#     payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [1,2,3,4,5]}
#     response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
#     print(response.text + "\n")
#     payload = {"date": "2022-10-23T10:50:05.739Z", "astronauts": [7,8,9,10,11]}
#     response = requests.post(URL_rotation_mission+'rotation-mission', json=payload)
#     print(response.text + "\n")

    print("=> Envoi d'un vaisseau via Spacecraft Service")
    print("   En tant que Gene, je veux controler le lancement des vaisseaux")
    print("   On s'attend à trouver le status du vaisseau à envoyé et le statut de la mission à en cours d'acheminement")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf/launch")
    print("Response : ")
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/launch")
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    print("---------------------- US 14 ----------------------\n")
    print("=> Explosion du vaisseau en plein vol")
    print("   On s'attend à trouver le status du vaisseau à Damaged et le statut de la mission à en cours de traitement")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf")
    print("Response : ")
    payload = { "id_spacecraft": 1, "vitals": False, "status": "Endommagé", "id_resupplyMission": id_resupplyMission }
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft, json=payload)
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    print("=> Reattribution d'une mission de ravitaillement à un vaisseau via Spacecraft Service")
    print("   En tant que Gene, je veux pouvoir attribuer un nouveau vaisseau pour lancer la mission de réapprovisionnement lorsque la précédente échoue")
    print("   On s'attend à trouver l'id de la mission inchangé et l'id du vaisseau de la mission changé")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraft")
    print("Response : ")
    id_spacecraft = "2"
    payload = { "id_resupplyMission": id_resupplyMission}
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/affectSpaceCraftToMission",json=payload)
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

    print("=> Envoi d'un vaisseau via Spacecraft Service")
    print("   En tant que Gene, je veux envoyer un nouveau vaisseau")
    print("   On s'attend à trouver le status du vaisseau 2 à envoyé et le statut de la mission à en cours d'acheminement")
    print("PUT http://localhost:4305/spacecraft/:idSpacecraf/launch")
    print("Response : ")
    response = requests.put(URL_spacecraft+'spacecraft/'+id_spacecraft+"/launch")
    print(response.text)
    response = requests.get(URL_resupply+'resupply/resupplyMission')
    print(response.text + "\n")

