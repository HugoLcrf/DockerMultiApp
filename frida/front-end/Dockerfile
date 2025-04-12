# Utilise l'image Nginx légère
FROM nginx:alpine

# Supprime le contenu par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie le front-end dans le dossier de Nginx
COPY . /usr/share/nginx/html

# Expose le port 80
EXPOSE 80
