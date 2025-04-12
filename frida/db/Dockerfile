# Image Apache + PHP + extensions
FROM php:8.2-apache

# Installer extensions nécessaires (ex: PDO MySQL pour la base)
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers PHP dans le dossier web d'Apache
COPY . /var/www/html/

# Activer les modules Apache si nécessaire (ex: rewrite)
RUN a2enmod rewrite

# Changer les droits si besoin
RUN chown -R www-data:www-data /var/www/html

# Expose le port HTTP
EXPOSE 80
