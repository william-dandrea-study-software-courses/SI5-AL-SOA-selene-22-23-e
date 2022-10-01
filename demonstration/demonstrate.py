import requests
import json
import os
import time
import subprocess


URL_life_support = "http://" + os.environ.get("LIFE_SUPPORT_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'
URL_needs_control =  "http://" + os.environ.get("NEEDS_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4302')+'/'
URL_resupply =  "http://" + os.environ.get("RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT", 'localhost:4301')+'/' 
URL_gateway = "http://" + os.environ.get("GATEWAY_URL_WITH_PORT",'localhost:9500')

print("=> Start Integration Test")
print("")
print("=> Peuplage de la base de données")
print(".")
payload = {"id_module": 512, "lifeStatus": True,"supplies":True}
print(requests.post(URL_module_life+'module',json=payload).text)
print(".")
print(URL_module_life+'module')
print(requests.post(URL_module_life+'module',json=
{"id_module":513,
"lifeStatus":True,
"supplies":False}).text)
print(".")
print(requests.post(URL_module_life+'module',json=
{"id_module":514,
"lifeStatus":True,
"supplies":False}).text)
print(".")
print(requests.post(URL_module_life+'module',json=
{"id_module":515,
"lifeStatus":True,
"supplies":True}).text)
print(".")
print("------------------------------------------------------------------------------------------")
print("=> Récupérer l'etat individuel des modules via life support service")
print("En tant que Deke je veux récupérer tout les modules avec leur états")
print("")
print("GET http://localhost:4304/supervision/")
print("Response : ")
response = requests.get(URL_life_support+'supervision/')
print(response.text)

print("=> Récupérer l'état général des modules via life support service")
print("En tant que Deke je savoir si tout mes modules sont dans un bon états rapidement")
print("")
print("GET http://localhost:4304/supervision/global")
print("Response : ")
response = requests.get(URL_life_support+'supervision/global')
print(response.text)
print("")
print("------------------------------------------------------------------------------------------")

print("=> Récupérer la liste des besoins des modules via needs control service")
print("En tant que Buzz je veux récupérer tout les besoins des modules")
print("")
print("GET http://localhost:4302/needs-control-supervision/moduleNeeds")
print("Response : ")
response = requests.get(URL_needs_control+'needs-control-supervision/moduleNeeds')
print(response.text)

print("=> Envoyer une commande à la terre via needs control service")
print("En tant que Buzz je veux envoyer 2 commande au service resupply une de 13 objet et une autre de 26")
print("")
print("POST http://localhost:4302/needs-control-supervision/sendOrder")
print("Body :")
body = {"quantity":13}
print(body)
print("Response : ")
response = requests.post(URL_needs_control+'needs-control-supervision/sendOrder',json=body)
print(response.text)
print("")
print("")
print("POST http://localhost:4302/needs-control-supervision/sendOrder")
print("Body :")
body = {"quantity":26}
print(body)
print("Response : ")
response = requests.post(URL_needs_control+'needs-control-supervision/sendOrder',json=body)
print(response.text)
print("")
print("------------------------------------------------------------------------------------------")

print("=> Récupération de la commande via resupply supervision service")
print("En tant que Dorothy je veux récupérer toutes les commandes passées")
print("")
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
print(response.text)
print("")

print("=> Validation de la commande via resupply supervision service")
print("En tant que Dorothy je veux valider toutes une commande passé")
print("")
print("PUT http://localhost:4301/resupply-supervision/:idCommande/validate")
print("Response : ")
id = response.json()[0].get("_id")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/validate')
print(response.text)
print("")

print("=> Récupération de la commande via resupply supervision service")
print("En tant que Dorothy je veux récupérer toutes les commandes passées")
print("")
print("GET http://localhost:4301/resupply-supervision/supplyOrders")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/supplyOrders')
print(response.text)
print("")

print("=> Récupération des missions de ravitaillement via resupply supervision service")
print("En tant que Dorothy je veux récupérer les missions de ravitaillement")
print("")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text)
print("")

print("=> Envoie du ravitaillement par Dorothy")
print("En tant que Dorothy je veux envoyer des commandes vers la base lunaire")
print("")
id = response.json()[0].get("_id")
print("PUT http://localhost:4301/resupply-supervision/:missionId/send")
print("Response : ")
response = requests.put(URL_resupply+'resupply-supervision/'+id+'/send')
print(response.text)
print("")

print("=> Récupération des missions de ravitaillement via resupply supervision service")
print("En tant que Dorothy je veux récupérer les missions de ravitaillement")
print("")
print("GET http://localhost:4301/resupply-supervision/rocketStatus")
print("Response : ")
response = requests.get(URL_resupply+'resupply-supervision/rocketStatus')
print(response.text)
print("")
time.sleep(20)
