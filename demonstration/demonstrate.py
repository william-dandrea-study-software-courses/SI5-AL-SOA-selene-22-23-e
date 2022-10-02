import requests
import json
import os
import time
import subprocess

#Urls des différents micro-services et de la gateway
URL_life_support = "http://" + os.environ.get("LIFE_SUPPORT_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/' 
URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

idModule = 512

def fillModuleServiceDatabase() :
    print("=> Peuplement de la base de données\n")
    print("Ajout de 4 modules pour un quota de provisions max à 10:")
    print("  - Inventaire de 32 provisions")
    print("  - Modules isolés : 1 (514) ")
    print("  - Modules en mauvaise situation : 2")
    print("  - Besoins de 8 provisions\n")
    print("POST http://localhost:4303/module")
    payload = {"id_module": idModule, "lifeStatus": False, "supplies":10, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 513, "lifeStatus": True, "supplies":7, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 514, "lifeStatus": False, "supplies":9, "isolated": True}
    print(requests.post(URL_module_life+'module',json=payload).text)
    payload = {"id_module": 515, "lifeStatus": True, "supplies":6, "isolated": False}
    print(requests.post(URL_module_life+'module',json=payload).text)

print("------------------------------------------------------------------------------------------")
fillModuleServiceDatabase()
print("\n--------------------------------- Start Integration Tests --------------------------------\n")

print("---------------------- Scenario 1 ----------------------\n")
print("=> Récupérer l'état individuel des modules via Life Support Service")
print("   En tant que Deke, je veux controler l'état des conditions de vie de chaque module")
print("   On s'attend à recevoir les 4 modules dont 2 avec le champ lifeStatus à false")
print("GET http://localhost:4304/supervision/")
print("Response : ")
response = requests.get(URL_life_support+'supervision/')
print(response.text + "\n")

print("=> Récupérer l'état général des modules via Life Support Service")
print("   En tant que Deke, je veux savoir si tous les modules sont dans un bon état rapidement")
print("   On s'attend à recevoir false car 2 des 4 modules n'ont pas des conditions de vie acceptables")
print("GET http://localhost:4304/supervision/global")
print("Response : ")
response = requests.get(URL_life_support+'supervision/global')
print(response.text + "\n")

print("---------------------- Scenario 2 ----------------------\n")
print("=> Récupérer la liste des besoins des modules via Needs Control Service")
print("   En tant que Buzz, je veux récupérer tous les besoins des modules")
print("   On s'attend à recevoir un objet avec le champ quantity à 8 car il manque respectivement 0, 3, 1 et 4 provisions à chaque module pour atteindre le stock maximal")
print("GET http://localhost:4302/needs-control-supervision/moduleNeeds")
print("Response : ")
response = requests.get(URL_needs_control+'needs-control-supervision/moduleNeeds')
print(response.text + "\n")

print("=> Envoyer une commande à la terre via needs control service")
print("   En tant que Buzz, je veux envoyer 2 commandes au Resupply Service, une de 13 objets et une autre de 26")
print("POST http://localhost:4302/needs-control-supervision/sendOrder")
print("Body :")
body = {"quantity":13}
print(body)
print("Response : ")
response = requests.post(URL_needs_control+'needs-control-supervision/sendOrder',json=body)
print(response.text + "\n")

print("POST http://localhost:4302/needs-control-supervision/sendOrder")
print("Body :")
body = {"quantity":26}
print(body)
print("Response : ")
response = requests.post(URL_needs_control+'needs-control-supervision/sendOrder',json=body)
print(response.text + "\n")


print("---------------------- Scenario 3 ----------------------\n")
print("=> Récupération des commandes de la base lunaire via Resupply Service")
print("   En tant que Dorothy, je veux voir toutes les commandes passées")
print("   On s'attend à voir les deux commandes de 13 et 26 provisions passées par Buzz précédemment. Elles seront toutes les deux en En cours de traitement ")
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
id = response.json()[0].get("_id")
print(response.text + "\n")

print("=> Récupération des missions de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
print("   On s'attend à n'avoir aucune mission de ravitaillement car aucune mission n'a été lancée et aucune commande n'a été validée")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text + "\n")

print("=> Validation d'une commande via Resupply Service")
print("   En tant que Dorothy, je veux valider une commande passée par la base lunaire")
print("   On valide la première commande de Buzz, celle avec 13 provisions demandées et on s'attend à récupérer un Commande validée")
print("PUT http://localhost:4301/resupply-supervision/:idCommande/validate")
print("Response : ")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/validate')
print(response.text + "\n")

print("=> Récupération de la commande via Resupply Service")
print("   En tant que Dorothy, je veux m'assurer que la commande a été bien été validée")
print("   Cette fois, on s'attend toujours à récupérer les deux commandes de Buzz mais la première sera passée en Validé")
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
print(response.text + "\n")

print("=> Récupération des missions de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
print("   On s'attend cette fois à retrouver une seule mission de ravitaillement qui contient la commande de 13 provisions. Cette commande sera En cours de traitement")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text + "\n")

print("=> Envoi d'une mission de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux envoyer une mission de ravitaillement vers la base lunaire")
print("   On envoie la mission de ravitaillement précédente et on s'attend à voir son statut passer en En cours d'acheminement")
id = response.json()[0].get("_id")
print("PUT http://localhost:4301/resupply-supervision/:missionId/send")
print("Response : ")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/send')
print(response.text + "\n")

print("=> Récupération des missions de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
print("   On s'attend à récupérer une seule mission de ravitaillement avec son statut En cours d'acheminement")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text + "\n")

print("---------------------- Scenario 4 ----------------------\n")
print("=> Isolement d'un module lunaire via Life Support Service")
print("   En tant que Deke, je veux isoler un module à distance. Par exemple le 512")
print("PUT http://localhost:4304/supervision/:idModule/isolate")
print("Response : ")
response = requests.put(URL_life_support+'supervision/'+str(idModule)+'/isolate')
print(response.text + "\n")

print("=> Récupération des données d'un module lunaire via Life Support Service")
print("   On veut s'assurer que le module 512 a bien été isolé")
print("   On s'attend à ce que le champ isolated du module 512 soit à true ")
print("GET http://localhost:4303/module")
print("Response : ")
response = requests.get(URL_module_life+'module')
print(response.text + "\n")

print("---------------------- Scenario 5 ----------------------\n")
print("=> Récupération de l'inventaire de la base lunaire via Module Life Service")
print("   En tant que Jim, je veux contrôler l'inventaire de la base lunaire")
print("   On s'attend à récupérer un objet avec le champ quantity à 32 car les modules possèdent respectivement 10, 7, 9 et 6 provisions")
print("GET http://localhost:4303/inventory")
print("Response : ")
response = requests.get(URL_module_life+'inventory')
print(response.text + "\n")
print("---------------------------------- End Integration Tests ---------------------------------")
