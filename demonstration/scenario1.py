import requests
import os

URL_life_support = "http://" + os.environ.get("LIFE_SUPPORT_SERVICE_URL_WITH_PORT", 'localhost:4304')+'/'
URL_module_life =  "http://" + os.environ.get("MODULE_LIFE_SERVICE_URL_WITH_PORT", 'localhost:4303')+'/'

def scenario1():
    print("---------------------- Scenario 1 ----------------------\n")
    print("=> Récupérer l'état individuel des modules via Survival Control Service")
    print("   En tant que Deke, je veux controler l'état des conditions de vie de chaque module")
    print("   On s'attend à recevoir les 4 modules avec leur vitals")
    print("GET http://localhost:4304/supervision/")
    print("Response : ")
    response = requests.get(URL_life_support+'supervision')
    print(response.text + "\n")

    print("=> Récupération des données d'un module lunaire via Survival Control Service")
    print("   On veut s'assurer qu'aucun module est isolé")
    print("   On s'attend à ce que le champ isolated du module 512 soit à false ")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

    print("=> Isolement d'un module lunaire via Survival Control Service")
    print("   En tant que Deke, je veux isoler le module 512 aprés avoir controlé les vitals")
    print("   On vérifie qu'aucun module n'est isolé")
    print("PUT http://localhost:4304/supervision/:idModule/isolate")
    print("Response : ")
    response = requests.put(URL_life_support+'supervision/512/isolate')
    print(response.text + "\n")

    print("=> Récupération des données d'un module lunaire via Survival Control Service")
    print("   On veut s'assurer que le module 512 a bien été isolé")
    print("   On s'attend à ce que le champ isolated du module 512 soit à true ")
    print("GET http://localhost:4303/module")
    print("Response : ")
    response = requests.get(URL_module_life+'module')
    print(response.text + "\n")

scenario1()