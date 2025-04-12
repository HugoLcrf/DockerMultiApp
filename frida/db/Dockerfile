# Image officielle avec Apache + PHP
FROM php:8.2-apache

# Installer les extensions nécessaires (PDO MySQL pour la base de données)
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers PHP dans le dossier web d'Apache
COPY . /var/www/html/

# Donner les droits à Apache
RUN chown -R www-data:www-data /var/www/html

# Activer le module rewrite si besoin
RUN a2enmod rewrite

# Expose le port HTTP
EXPOSE 80