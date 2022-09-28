#Peupler la base de données des modules
curl -X 'POST' \
  'http://localhost:4303/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":512,
"status":true,
"needs":true}'

curl -X 'POST' \
  'http://localhost:4303/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":513,
"status":true,
"needs":false}'

curl -X 'POST' \
  'http://localhost:4303/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":514,
"status":true,
"needs":true}'

curl -X 'POST' \
  'http://localhost:4303/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":515,
"status":true,
"needs":true}'

#Récupérer l'état individuel des modules par Deke via life support
curl -X 'GET' \
  'http://localhost:4304/supervision/supervise' \
  -H 'accept: application/json'

#Récupérer l'état général des modules par Deke via life support

curl -X 'GET' \
  'http://localhost:4304/supervision/global-supervise' \
  -H 'accept: application/json'

#Récupérer la liste des besoins des modules par Buzz via needs control

curl -X 'GET' \
  'http://localhost:4302/needs-control-supervision/moduleNeeds' \
  -H 'accept: application/json'

#Envoyer une commande à la terre par Buzz via needs control
curl -X 'POST' \
  'http://localhost:4302/needs-control-supervision/sendOrder' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"quantity":13}'

  curl -X 'POST' \
    'http://localhost:4302/needs-control-supervision/sendOrder' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{"quantity":26}'
#Récupération de la commande par Dorothy via resupply supervision
curl -X 'GET' \
  'http://localhost:4301/resupply-supervision/getOrders' \
  -H 'accept: application/json'

#Récupération de l'état de la fusée par Dorothy via resupply supervision
