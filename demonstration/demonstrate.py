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
    print("  - Modules en mauvaise situation : 1")
    print("  - Besoins de 8 provisions")
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
print("GET http://localhost:4304/supervision/")
print("Response : ")
response = requests.get(URL_life_support+'supervision/')
print(response.text + "\n")

print("=> Récupérer l'état général des modules via Life Support Service")
print("   En tant que Deke, je veux savoir si tous les modules sont dans un bon état rapidement")
print("GET http://localhost:4304/supervision/global")
print("Response : ")
response = requests.get(URL_life_support+'supervision/global')
print(response.text + "\n")

print("---------------------- Scenario 2 ----------------------\n")
print("=> Récupérer la liste des besoins des modules via Needs Control Service")
print("   En tant que Buzz, je veux récupérer tous les besoins des modules")
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
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
print(response.text + "\n")

print("=> Validation d'une commande via Resupply Service")
print("   En tant que Dorothy, je veux valider une commande passée par la base lunaire")
print("PUT http://localhost:4301/resupply-supervision/:idCommande/validate")
print("Response : ")
id = response.json()[0].get("_id")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/validate')
print(response.text + "\n")

print("=> Récupération de la commande via Resupply Service")
print("   En tant que Dorothy, je veux m'assurer que la commande a été bien été validée")
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
print(response.text + "\n")

print("=> Récupération des missions de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text + "\n")

print("=> Envoi d'une mission de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux envoyer une mission de ravitaillement vers la base lunaire")
id = response.json()[0].get("_id")
print("PUT http://localhost:4301/resupply-supervision/:missionId/send")
print("Response : ")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/send')
print(response.text + "\n")

print("=> Récupération des missions de ravitaillement via Resupply Service")
print("   En tant que Dorothy, je veux controler les missions de ravitaillement")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text + "\n")

print("---------------------- Scenario 4 ----------------------\n")
print("=> Isolement d'un module lunaire via Life Support Service")
print("   En tant que Deke, je veux isoler un module à distance")
print("PUT http://localhost:4304/supervision/:idModule/isolate")
print("Response : ")
response = requests.put(URL_life_support+'supervision/'+str(idModule)+'/isolate')
print(response.text + "\n")

print("---------------------- Scenario 5 ----------------------\n")
print("=> Récupération de l'inventaire de la base lunaire via Module Life Service")
print("   En tant que Jim, je veux contrôler l'inventaire de la base lunaire")
print("GET http://localhost:4303/inventory")
print("Response : ")
response = requests.get(URL_module_life+'/inventory')
print(response.text + "\n")
print("---------------------------------- End Integration Tests ---------------------------------")
