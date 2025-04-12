## Objectif

Ce projet consiste à mettre en production un environnement complet à l’aide de Docker et Docker Compose. L’infrastructure comprend :

- Un site web statique (HTML/CSS/JS)
- Une API PHP connectée à une base de données MySQL
- Un serveur Nextcloud pour le stockage et le partage de fichiers
- Un serveur OnlyOffice pour l’édition collaborative de documents
- Une application Whiteboard pour le dessin collaboratif

## Structure des services

- `frida_web` : site statique contenant les pages HTML
- `frida_api` : API PHP connectée à une base de données MySQL
- `frida_db` : base de données utilisée par l’API
- `nextcloud` : service de partage de fichiers
- `nextcloud_db` : base de données MariaDB pour Nextcloud
- `onlyoffice` : service complémentaire de Nextcloud pour l’édition de documents
- `whiteboard` : application de tableau blanc collaboratif

## Lancement du projet

Assurez-vous que Docker et Docker Compose sont installés.

Dans le dossier du projet, lancez :

```bash
docker-compose up --build
```

L’ensemble des services sera lancé automatiquement.

## Accès aux services

- Site web statique : http://localhost:8080
- API PHP : http://localhost:8081
- Nextcloud : http://localhost:8082
- OnlyOffice : http://localhost:8083
- Whiteboard : http://localhost:8084

## Volumes et persistance des données

Des volumes Docker sont utilisés pour que les données ne soient pas perdues lors des redémarrages :

- `frida_db_data` : stockage de la base de données de l’API
- `nextcloud_data` : fichiers et configuration de Nextcloud
- `nextcloud_db_data` : base de données de Nextcloud

## Sécurité

- Les bases de données ne sont pas exposées en dehors des conteneurs.
- Les identifiants sont définis dans les variables d’environnement du `docker-compose.yml`.
- Il est possible de les externaliser dans un fichier `.env` pour sécuriser davantage les informations sensibles.

## Mise à jour des services

Pour mettre à jour les images utilisées sans perdre les données :

```bash
docker-compose pull
docker-compose up -d
```

Pour relancer complètement l’environnement :

```bash
docker-compose down
docker-compose up --build
```

## Résolution DNS locale

En l’absence de serveur DNS, il est possible d’ajouter les entrées suivantes dans le fichier `hosts` de votre système (Linux/macOS : `/etc/hosts`, Windows : `C:\Windows\System32\drivers\etc\hosts`) :

sudo nano /etc/hosts

```
127.0.0.1 nextcloud.local
127.0.0.1 onlyoffice.local
127.0.0.1 whiteboard.local
127.0.0.1 api.local
127.0.0.1 site.local
```

Pour y acceder : 

Site Web	http://site.local:8080
API	http://api.local:8081
Nextcloud	http://nextcloud.local:8082
OnlyOffice	http://onlyoffice.local:8083
Whiteboard	http://whiteboard.local:8084

Ces noms peuvent être utilisés avec un proxy ou à travers une configuration Nginx avancée.

## Justification des choix techniques

- Chaque service est isolé dans un conteneur distinct pour une meilleure maintenabilité.
- Les volumes assurent la persistance des données même en cas de suppression de conteneur.
- Les images utilisées sont officielles, régulièrement mises à jour et bien documentées.
- L’usage de `depends_on` dans le `docker-compose.yml` permet de garantir un ordre de démarrage cohérent.

## Évolutivité et maintenance

Les services sont facilement maintenables :

- Mise à jour possible par `docker-compose pull` sans perte de données
- Possibilité d’adapter ou remplacer une image sans modifier l'ensemble de l'architecture
- Ajout futur de reverse proxy, certificat SSL, monitoring possible sans tout redéployer