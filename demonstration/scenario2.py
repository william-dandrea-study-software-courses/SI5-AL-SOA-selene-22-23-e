import requests
import os
import json

URL_life_support = 'http://' + os.environ.get('LIFE_SUPPORT_SERVICE_URL_WITH_PORT', 'localhost:4304')+'/'
URL_module_life =  'http://' + os.environ.get('MODULE_LIFE_SERVICE_URL_WITH_PORT', 'localhost:4303')+'/'
URL_needs_control =  'http://' + os.environ.get('NEEDS_CONTROL_SERVICE_URL_WITH_PORT', 'localhost:4302')+'/'
URL_resupply =  'http://' + os.environ.get('RESUPPLY_CONTROL_SERVICE_URL_WITH_PORT', 'localhost:4301')+'/'
URL_gateway = 'http://' + os.environ.get('GATEWAY_URL_WITH_PORT','localhost:9500')

def peuplageDB():
    # PeuplageDB
    # result = requests.get('http://localhost:4303/module')
    payload = {'id_module': 0, 'vitals': {'co2_rate': 100,'co2_scrubbers_activated':True}, 'supplies': 10, 'isolated': False}
    result = requests.post('http://localhost:4303/module', payload)
    print(result.text)


def scenario2():
    print('- Requête de Jim à Module Life Service pour vérifier l’inventaire de la base qui lui renvoie l’inventaire.')
    print('    - L’astronaute responsable des provisions et de la logistique demande au Module Life Service à voir l’inventaire de la base')
    print('    - Le Module Life Service reçoit une requête demandant à voir l’inventaire')
    print('    - Le Module Life Service traite cette demande et renvoie l’inventaire de la base')







    print('- Requête de Buzz à Needs Control Service pour vérifier les besoins des modules, le service contacte Module Life Service qui lui renvoie la liste des besoins.')
    print('    - Le commandant du village lunaire demande au Needs Control Service à voir les besoins essentiels à la vie dans les modules')
    print('    - Le Module Life Service reçoit une requête du Needs Control Service demandant à voir les besoins essentiels à la vie dans le module')
    print('    - Le Module Life Service traite cette demande et renvoie la liste des besoins relatifs aux éléments essentiels à la vie dans le module au Needs Control Service (quantité)')
    print('    - Le Needs Control Service renvoie cette liste au commandant du village lunaire')




    print('- Requête de Buzz à Needs Control Service pour passer une commande (demande de réapprovisionnement)')
    print('    - Le commandant du village lunaire fait une demande de réapprovisionnement au Needs Control Service')
    print('    - Le Resupply Service reçoit une requête de réapprovisionnement de la part du Needs Control Service')
    print('    - Le Resupply Service traite cette demande et créer une commande en attente de validation et renvoie la commande créée.')



    print('- Requête de Dorothy à Resupply Service demandant à voir les commandes')
    print('    - La responsable de la logistique demande au Resupply Service à voir les commandes')
    print('    - Le Resupply Service reçoit une requête demande à voir les commandes')
    print('    - Le Resupply Service traite la demande et renvoie la liste de toutes les commandes')



    print('- Requête de Dorothy à Resupply Service pour valider une commande')
    print('    - La responsable de la logistique demande au Resupply Service pour valider une commande')
    print('    - Le Resupply Service reçoit une requête demande valider une commande')
    print('    - Le Resupply Service traite la demande, il valide la commande et l’ajoute à la liste des commandes de la prochaine fusée')



    print('- Requête de Gene à Spacecraft Service pour regarder la liste des vaisseaux spatiaux disponibles')
    print('    - Le directeur de vol demande au Spacecraft Service à voir la liste des vaisseaux disponibles')
    print('    - Le Spacecraft Service reçoit une requête demande à voir la liste des vaisseaux disponibles')
    print('    - Le Spacecraft Service traite la demande et renvoie la liste des vaisseaux disponibles')



    print('- Requête de Gene à Spacecraft Service pour attribuer un vaisseau spatial à une mission de ravitaillement')
    print('    - Le directeur de vol demande demande au Spacecraft Service à attribuer un vaisseau à une mission de ravitaillement')
    print('    - Le Spacecraft Service reçoit une requête demandant à attribuer un vaisseau à une mission de ravitaillement')
    print('    - Le Spacecraft Service envoie une demande d’assignation de vaisseau au Resupply Service qui lui renvoie ok')
    print('    - Le Spacecraft Service reçoit le résultat et renvoie également ok.')



    print('- Requête de Gene à Spacecraft Service pour indiquer que le vaisseau spatial a décollé')
    print('    - Le commandant du village lunaire fait une demande à Spacecraft Service pour faire décoller le vaisseau spatial')
    print('    - Le Spacecraft Service reçoit une requête de décollage d’un vaisseau spatial')
    print('    - Le Spacecraft Service traite cette demande, change le statut du vaisseau spatial et ok')



    print('- Requête de Buzz à Module Life Service pour réapprovisionner les modules')
    print('    - Le commandant du village lunaire fait une demande à Module Life Service pour réapprovisionner les modules')
    print('    - Le Module Life Service reçoit une requête de réapprovisionnement')
    print('    - Le Module Life Service traite cette demande et réapprovisionne autant de modules en manque que de provisions fournies')



    response = requests.get(URL_needs_control + 'stock')
    print(response.text)


peuplageDB()
# scenario2()

