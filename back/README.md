# Kindred_project

Requis
````
OpenSSL : https://www.openssl.org/
PHP Version : 8.1
Composer : https://getcomposer.org/
````

Installation du projet
```
composer install

php bin/console lexik:jwt:generate-keypair
```

Modification .env
```
Mettre à jour les informations concernant votre BDD :
DATABASE_URL="mysql://username:password@127.0.0.1:3306/dbname?serverVersion=5.7"
```
Initialisation de la BDD
```
Crée base de donnée : php bin/console doctrine:database:create
Migration sur bdd : php bin/console doctrine:migrations:migrat
```

Lancé le serveur
```
php -S localhost:8000 -t public/
```

