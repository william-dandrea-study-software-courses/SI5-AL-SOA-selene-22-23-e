echo '=> Start Integration Test'
echo ''
echo '=> Peuplage de la Base de données'
echo ''

#Peupler la base de données des modules

curl -X 'POST' \
  'http://localhost:4303/module' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":512,
"lifeStatus":true,
"supplies":true}'

curl -X 'POST' \
  'http://localhost:4303/module' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":513,
"lifeStatus":true,
"supplies":false}'

curl -X 'POST' \
  'http://localhost:4303/module' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":514,
"lifeStatus":true,
"supplies":true}'


curl -X 'POST' \
  'http://localhost:4303/module' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"id_module":515,
"lifeStatus":true,
"supplies":true}'

echo ''
echo ''
echo '--------------------------------------------------'
echo ''

echo "=> Récupérer l'état individuel des modules via life support service"
echo 'En tans que Deke je veux récupérer tout les modules avec leur états'
echo ''

echo 'GET http://localhost:4304/supervision/'
echo ''
echo 'Response:'

#Récupérer l'état individuel des modules par Deke via life support
curl -X 'GET' \
  'http://localhost:4304/supervision/' \
  -H 'accept: application/json'

echo ''
echo ''
echo "=> Récupérer l'état général des modules via life support service"
echo "En tans que Deke je savoir si tout mes modules sont dans l'etat true rapidement"
echo ''
echo 'GET http://localhost:4304/supervision/global'
echo ''

echo 'Response:'
#Récupérer l'état général des modules par Deke via life support

curl -X 'GET' \
  'http://localhost:4304/supervision/global' \
  -H 'accept: application/json'

echo ''
echo '--------------------------------------------------'
echo ''
echo "=> Récupérer la liste des besoins des modules via needs control service"
echo 'En tans que Buzz je veux récupérer tout les besoins des modules'
echo ''

echo 'GET http://localhost:4302/needs-control/moduleNeeds'
echo ''
echo 'Response:'
#Récupérer la liste des besoins des modules par Buzz via needs control

curl -X 'GET' \
  'http://localhost:4302/needs-control/moduleNeeds' \
  -H 'accept: application/json'

echo ''
echo ''
echo "=> Envoyer une commande à la terre via needs control service"
echo 'En tant que Buzz je veux envoyer 2 commande au service resupply une de 13 objet et une autre de 26'
echo ''

echo 'POST http://localhost:4302/needs-control/sendOrder'
echo ''

echo 'Body : '
echo '{"quantity":13}'
echo ''
echo 'Response:'
#Envoyer une commande à la terre par Buzz via needs control
curl -X 'POST' \
  'http://localhost:4302/needs-control/sendOrder' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"quantity":13}'

echo ''
echo ''
echo 'POST http://localhost:4302/needs-control/sendOrder'
echo ''
echo 'Body : '
echo '{"quantity":26}'
echo ''
echo 'Response:'
curl -X 'POST' \
  'http://localhost:4302/needs-control/sendOrder' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"quantity":26}'

echo ''
echo ''
echo '--------------------------------------------------'
echo ''
echo "=> Récupération de la commande via resupply supervision service"
echo 'En tant que Dorothy je veux récupérer toutes les commandes passées'
echo ''

echo 'GET http://localhost:4301/resupply/supplyOrders'
echo ''

echo 'Response:'
#Récupération de la commande par Dorothy via resupply supervision
curl -X 'GET' \
  'http://localhost:4301/resupply/supplyOrders' \
  -H 'accept: application/json'

echo ''
#Récupération de l'état de la fusée par Dorothy via resupply supervision
