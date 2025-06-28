# Guide de déploiement Pokédex

## Sur votre machine locale

### 1. Pousser sur GitHub
```bash
git add .
git commit -m "Conversion site statique terminée"
git push origin main
```

## Sur votre VPS

### 2. Cloner le repo
```bash
cd /opt
sudo git clone https://github.com/votre-username/Pokedex.git pokedex
sudo chown -R $USER:$USER /opt/pokedex
cd /opt/pokedex
```

### 3. Installer Node.js (si pas déjà fait)
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

### 4. Build du projet
```bash
# Installer les dépendances
npm install

# Build du projet
npm run build

# Export statique
npx next export
```

### 5. Déployer vers nginx
```bash
# Créer le dossier web
sudo mkdir -p /var/www/pokedex

# Copier les fichiers statiques
sudo cp -r out/* /var/www/pokedex/

# Permissions
sudo chown -R www-data:www-data /var/www/pokedex
sudo chmod -R 755 /var/www/pokedex
```

### 6. Configurer Nginx
```bash
# Copier la config
sudo cp nginx.conf.example /etc/nginx/sites-available/pokedex

# Modifier le domaine
sudo nano /etc/nginx/sites-available/pokedex
# Remplacer "votre-domaine.com" par votre vraie domain

# Activer le site
sudo ln -s /etc/nginx/sites-available/pokedex /etc/nginx/sites-enabled/

# Tester la config
sudo nginx -t

# Recharger nginx
sudo systemctl reload nginx
```

### 7. Mises à jour futures
```bash
cd /opt/pokedex
git pull origin main
npm install
npm run build
npx next export
sudo cp -r out/* /var/www/pokedex/
```

## Notes
- Le dossier `out/` n'est pas versionné (dans .gitignore)
- Toujours faire le build sur le serveur pour éviter les problèmes de compatibilité
- Les assets (images Pokémon) sont inclus dans le repo