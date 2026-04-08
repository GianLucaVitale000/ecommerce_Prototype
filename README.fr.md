# 🛍️ E-Commerce Prototype

[Italiano](./README.md) | [Français](./README.fr.md)

![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

Une application e-commerce full-stack moderne construite avec PHP, JavaScript vanilla et CSS moderne. Ce projet intègre la gestion du panier, l'authentification utilisateur, le filtrage de produits et le mode thème clair/sombre.

**Statut**: Prototype de production  
**Version**: 1.0.0  
**Licence**: MIT

---

## ✨ Caractéristiques principales

- **🔐 Authentification utilisateur**: Système de connexion/déconnexion basé sur les sessions PHP (connexion fictive via randomuser.me)
- **🛒 Panier persistant**: Gestion du panier en session côté serveur avec synchronisation PHP-JavaScript
- **🎨 Thème dynamique**: Basculer mode clair/sombre avec sauvegarde persistante dans localStorage
- **📱 Design réactif**: Mise en page mobile-first avec menu hamburger
- **🔍 Filtrage de produits**: Système de filtres par catégorie en temps réel
- **📦 Paiement**: Flux d'achat complet avec validation des données
- **👤 Profil utilisateur**: Gestion des données utilisateur et historique des commandes
- **⚖️ Conformité GDPR**: Modal politique de confidentialité global, validation de la confidentialité sur les formulaires de contact
- **♿ Accessibilité**: Support des labels ARIA et lecteur d'écran

---

## 🛠️ Pile technologique

| Technologie | Utilisation |
| ----------- | ---------- |
| **PHP 7.4+** | Backend, gestion des sessions, traitement du paiement |
| **MySQL/MariaDB** | (Prêt pour l'intégration) Base de données persistante |
| **JavaScript ES6+** | Interactivité frontend, gestion du DOM |
| **CSS3** | Style modularisé, animations, design réactif |
| **HTML5** | Balisage sémantique, SEO-friendly |
| **Material Symbols** | Iconographie Google |
| **Google Fonts** | Typographie (Montserrat, Nunito, Titillium Web) |

---

## 📁 Structure du projet

```Text
ecommerce_Prototype/
├── index.php                    # Page d'accueil principale
├── css/                         # Feuilles de style modularisées
│   ├── style.css               # Styles globaux
│   ├── cards.css               # Style des cartes de produits
│   ├── cart.css                # Style du panier et barre latérale
│   ├── checkout.css            # Style de la page de paiement
│   ├── dettaglio.css           # Style de la page détails produit
│   ├── filter.css              # Style du système de filtres
│   ├── hamburger.css           # Style du menu hamburger
│   ├── hero.css                # Style de la section hero
│   ├── profile.css             # Style de la page profil
│   ├── side.css                # Style du menu latéral
│   ├── gdpr-compliance.css     # Styles de la modal de confidentialité
│   └── toggle.css              # Style du sélecteur de thème
├── html/                        # Pages statiques
│   ├── about.html              # À propos
│   ├── contacts.html           # Contacts
│   ├── privacy-policy.html     # Politique de confidentialité
│   ├── profile.html            # Profil utilisateur
│   └── services.html           # Services
├── php/                         # Backend PHP
│   ├── data.php                # Catalogue de produits (mock data)
│   ├── set_session.php         # Gestion des sessions (connexion)
│   ├── logout_session.php      # Déconnexion utilisateur
│   ├── carrello.php            # Page du panier
│   ├── checkout.php            # Page de paiement
│   └── dettaglio.php           # Page détails produit
├── scripts/                     # JavaScript frontend
│   ├── carousel.js             # Slider/carousel de produits
│   ├── cart.js                 # Gestion du panier et badge
│   ├── filterOverlay.js        # Système de filtres de produits
│   ├── gdpr-compliance.js      # Modal de confidentialité, checkbox confidentialité
│   ├── menu.js                 # Menu hamburger et auth
│   └── profile.js              # Gestion du profil utilisateur
└── img/                         # Asset images

```

---

## 🚀 Démarrage rapide

### Conditions préalables

- **Serveur PHP**: 7.4 ou supérieur
- **Serveur HTTP**: Apache ou Nginx
- **Navigateur**: Chrome, Firefox, Safari, Edge (versions récentes)
- **localStorage**: Activé dans le navigateur

### Installation

A - **Clonez le référentiel** ou extrayez les fichiers:

```bash
git clone https://github.com/GianLucaVitale000/ecommerce-prototype.git
cd ecommerce-Prototype
```

B - **Configurez le serveur local**:

- Copiez les fichiers dans un dossier servi par votre serveur PHP (ex. `htdocs/` pour XAMPP)
- Assurez-vous que PHP est activé

C - **Accédez à l'application**:

```Text
http://localhost/ecommerce-Prototype/index.php
```

### Premier utilisation

- Cliquez sur le **menu hamburger** en haut à gauche
- Sélectionnez un produit pour l'ajouter au panier
- Le badge du panier se met à jour automatiquement
- Connectez-vous pour procéder au paiement

---

## 📖 Documentation

- **[Architecture](./docs/ARCHITECTURE.md)** - Architecture du projet et modèles de conception
- **[Référence API](./docs/API.md)** - Endpoints PHP, sessions et structures de données

---

## 🔄 Flux applicatifs principaux

### Flux du panier

```Text
Sélection produit → Formulaire POST à carrello.php → Met à jour $_SESSION['carrello'] → 
Redirection → updateCartBadge() et updateCartIcons() → Badge mis à jour → Panier disponible si connecté
```

### Flux d'authentification

```Text
Formulaire de connexion → set_session.php → $_SESSION créée → localStorage['isLoggedIn']=true →
Panier actif → Paiement disponible
```

### Flux du thème

```Text
Basculer checkbox → setTheme() → localStorage['darkMode'] = true/false → 
Applique classe .dark-mode à body → Sauvegarde persistante entre sessions
```

---

## 🔑 Composants clés

### Backend PHP

| Fichier | Fonction |
| ------ | ---------- |
| `data.php` | Définit le catalogue des produits (tableau mock) |
| `set_session.php` | Crée la session utilisateur à la connexion |
| `logout_session.php` | Détruit la session utilisateur |
| `carrello.php` | Affiche et gère le panier |
| `checkout.php` | Formulaire et logique de paiement |
| `dettaglio.php` | Détails d'un produit unique |

### Frontend JavaScript

| Fichier | Fonction |
| ------ | ---------- |
| `cart.js` | Synchronisation du badge de panier avec la session PHP |
| `menu.js` | Menu hamburger, connexion/déconnexion, authentification |
| `filterOverlay.js` | Filtres de produits par catégorie |
| `profile.js` | Gestion du profil utilisateur |
| `gdpr-compliance.js` | Modal de confidentialité globale, validation de confidentialité (non-connectés) |
| `carousel.js` | Slider de produits showcases |

---

## 🎨 Thème et personnalisation

### Mode sombre

Le projet supporte le basculement clair/sombre:

- Par défaut: Mode clair
- Sélecteur disponible dans le menu latéral
- Sauvegarde dans `localStorage['darkMode']` comme booléen (`true`/`false`)
- Applique dynamiquement la classe CSS `.dark-mode` à `<body>`

### Palette de couleurs du thème

Les couleurs sont définies avec des sélecteurs codés en dur dans `css/style.css`:

**Mode clair (par défaut)**:

- Arrière-plan: `#ffffff` (blanc)
- Texte: `#333333` (foncé)
- Accent: `#666666` (gris)

**Mode sombre** (avec classe `.dark-mode`):

```css
body.dark-mode {
  background: #181a1b;
  color: #e0e0e0;
}

body.dark-mode .card,
body.dark-mode .side-menu {
  background: #23272b;
  color: #e0e0e0;
}

body.dark-mode .footer-link:hover {
  color: #ffd700;  /* effet hover or */
}
```

---

## 📱 Design réactif

Le projet utilise une approche **mobile-first** avec les points d'arrêt effectifs suivants:

| Point d'arrêt | Appareil | Remarques |
| ----------- | ----------- | --- |
| **max-width: 600px** | Mobile | Font réduite, mise en page compacte |
| **min-width: 768px** | Tablette | Mise en page multi-colonne |
| **max-width: 900px** | Tablette grande / Mobile paysage | Overlay filtres, menu adapté |
| **min-width: 1024px** | Bureau | Mise en page complète |

**Stratégies réactives implémentées**:

- Menu hamburger pour petits écrans (`< 900px`)
- Overlay filtres mobile (`max-width: 900px`)
- Mise en page adaptative pour footer et contenu
- Taille police optimisée pour lisibilité mobile

---

## 🔒 Sécurité et confidentialité

**Mesures de sécurité implémentées**:

- **Sessions PHP**: Gestion d'état utilisateur via `$_SESSION` côté serveur
- **Protection XSS**: Échappement des sorties avec `htmlspecialchars()` dans les templates PHP pour prévenir les injections de code
- **Conformité GDPR**:
  
  - Modal politique de confidentialité global accessible depuis toutes les pages
  - Checkbox confidentialité sur formulaire de contact (non-connectés seulement)
  - Politique de confidentialité complète dans `html/privacy-policy.html`

**Notes de sécurité**:

- ⚠️ **Validation d'entrée limitée**: Actuellement seul `htmlspecialchars()` est utilisé pour l'échappement. Manque validation côté serveur pour email, téléphone, longueur des champs
- ⚠️ **Protection CSRF**: Non implémentée (pas de token CSRF dans les formulaires)
- **Recommandation pour production**: Avant de déployer en production, mettre en place une validation robuste avec `filter_var()`, regex, et token CSRF

---

## 🐛 Débogage et développement

### Console du navigateur

```javascript
// Vérifier statut de session
localStorage.getItem('isLoggedIn')

// Vérifier badge du panier
window.PHP_CART_COUNT

// Déboguer thème actif
localStorage.getItem('darkMode')
```

### Débogage PHP

Ajoutez dans le fichier souhaité:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

---

## 🚧 Plan de route future

- [ ] Intégration base de données MySQL pour persistance des données
- [ ] Intégration gateway de paiement (Stripe, PayPal)
- [ ] Système d'avis et notation de produits
- [ ] Notifications par email pour commandes
- [ ] Tableau de bord d'administration
- [ ] Analyses et suivi
- [ ] API REST pour application mobile
- [ ] Optimisation du cache
- [ ] Support multilingue

---

## 📋 Conditions système

| Condition | Minimum | Recommandé |
| ----------- | -------- | ----------- |
| PHP | 7.4 | 8.1+ |
| Navigateur | IE 11 | Chrome/Firefox latest |
| RAM Serveur | 512MB | 2GB |
| Stockage | 50MB | 1GB |

---

## 🤝 Contribuer

Pour contribuer au projet, ouvrez une Pull Request avec vos modifications.

---

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](./LICENSE) pour les détails.

---

## 👨‍💻 Auteur

### Gian Luca Vitale

- **GitHub**: [GianLucaVitale000](https://github.com/GianLucaVitale000)
- **Email**: [gian.luca.vitale000@gmail.com](mailto:gian.luca.vitale000@gmail.com)
- **Date de création**: Avril 2026

---

Développé avec ❤️ en utilisant PHP, JavaScript et CSS vanilla
