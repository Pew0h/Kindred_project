# Kindred_project

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

Lancé le serveur
```
php -S localhost:8000 -t public/
```

