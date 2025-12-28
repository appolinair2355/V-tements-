# StyleShop - Boutique de Vêtements

Un site web complet pour une boutique de vêtements avec administration, filtrage de produits et commande par WhatsApp.

## 🌟 Fonctionnalités

### Pour les clients
- **Page d'accueil attractive** avec animations et effets décoratifs
- **Catalogue de produits** avec filtrage par catégorie (Homme, Femme, Enfant, Accessoires)
- **Commande directe par WhatsApp** avec message automatique
- **Design responsive** pour mobile et desktop

### Pour l'administrateur
- **Panneau d'administration** protégé par mot de passe
- **Ajout de produits** avec nom, prix, catégorie, description et photo
- **Gestion des produits** (suppression)
- **Statistiques** en temps réel
- **Session persistante** pendant 24 heures

## 🛠️ Technologies utilisées

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Stockage**: LocalStorage (navigateur)
- **Design**: Animations CSS, Flexbox, Grid

## 🚀 Installation locale

1. **Cloner le projet**
```bash
git clone [URL_DU_PROJET]
cd styleshop
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur**
```bash
npm start
```

4. **Accéder au site**
```
http://localhost:10000
```

## 🔐 Accès administrateur

- **URL**: `/admin`
- **Mot de passe**: `kouame`

## 📱 Configuration WhatsApp

Le numéro WhatsApp est configuré dans le fichier JavaScript:
```javascript
const WHATSAPP_NUMBER = '+22967924076';
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les variables CSS (`style.css`):
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --accent-color: #45b7d1;
    /* ... */
}
```

### Animations
Les animations sont gérées dans `script.js` avec:
- Animations au scroll
- Animations des statistiques
- Effets de hover
- Formes flottantes

## 📁 Structure du projet

```
styleshop/
├── index.html          # Page d'accueil
├── vetements.html      # Page des vêtements
├── admin.html          # Panneau administrateur
├── style.css           # Styles CSS
├── script.js           # JavaScript principal
├── server.js           # Serveur Node.js
├── package.json        # Configuration du projet
└── README.md          # Documentation
```

## 🌐 Déploiement sur Render.com

### Méthode 1: Déploiement automatique (via GitHub/GitLab)

1. **Créer un compte** sur [Render.com](https://render.com)

2. **Connecter votre dépôt Git** (GitHub, GitLab ou Bitbucket)

3. **Créer un nouveau Web Service**:
   - Cliquez sur "New" → "Web Service"
   - Sélectionnez votre dépôt

4. **Configurer le service**:
   - **Name**: `styleshop` (ou le nom de votre choix)
   - **Environment**: `Node`
   - **Region**: Choisissez la région la plus proche
   - **Branch**: `main` (ou votre branche principale)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Choisir selon vos besoins (Gratuit: Web Service Free)

5. **Variables d'environnement** (optionnel):
   - Aucune variable requise pour ce projet

6. **Port**:
   - Le serveur écoute sur le port `10000` par défaut
   - Render détectera automatiquement le port via la variable d'environnement `PORT`

7. **Cliquer sur "Create Web Service"**

8. **Attendre le déploiement** (2-3 minutes)

9. **Votre site est en ligne!** 🎉

### Méthode 2: Déploiement manuel (upload direct)

1. **Préparer les fichiers**:
   - Compresser tous les fichiers du projet en `.zip`
   - Sauf le dossier `node_modules`

2. **Créer un nouveau Static Site**:
   - Cliquez sur "New" → "Static Site"
   - Uploadez votre fichier ZIP

3. **Configurer**:
   - **Build Command**: `npm install`
   - **Publish Directory**: `/`

4. **Déployer**

### Configuration du nom de domaine (optionnel)

1. **Dans le dashboard Render**, allez dans les paramètres de votre service
2. **Section "Custom Domains"**
3. **Ajouter votre domaine personnalisé**
4. **Suivre les instructions** pour configurer les DNS

## 🔧 Maintenance

### Ajouter des produits d'exemple

Pour ajouter automatiquement des produits d'exemple (décommenter dans `script.js`):
```javascript
// setTimeout(addSampleProducts, 2000);
```

### Modifier le mot de passe admin

Changer la variable dans `script.js`:
```javascript
const ADMIN_PASSWORD = 'votre_nouveau_mot_de_passe';
```

### Changer le numéro WhatsApp

Modifier la variable dans `script.js`:
```javascript
const WHATSAPP_NUMBER = '+votre_numero';
```

## 🎯 Performance

- **Images optimisées**: Compression automatique
- **Animations CSS**: Utilisation de `transform` et `opacity`
- **Lazy loading**: Chargement différé des images
- **LocalStorage**: Stockage local pour une meilleure performance

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à:
- **Desktop** (1200px+)
- **Tablette** (768px - 1199px)
- **Mobile** (< 768px)

## 🔒 Sécurité

- **Mot de passe admin** hashé (à implémenter pour la production)
- **Validation des entrées** côté client
- **Protection XSS** via l'échappement des caractères
- **Sessions administrateur** avec expiration (24h)

## 🚀 Optimisations futures

- [ ] Base de données (MongoDB/PostgreSQL)
- [ ] Authentification avancée (JWT)
- [ ] Paiement en ligne
- [ ] Envoi d'emails automatiques
- [ ] Gestion des stocks
- [ ] Historique des commandes
- [ ] Interface de gestion avancée
- [ ] API REST
- [ ] Progressive Web App (PWA)

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

Développé pour StyleShop - Votre boutique de vêtements en ligne.

## 📞 Support

Pour toute question ou problème, contactez:
- **WhatsApp**: +229 67 92 40 76
- **Email**: contact@styleshop.com

---

**StyleShop** - Votre style, notre passion! 💫
