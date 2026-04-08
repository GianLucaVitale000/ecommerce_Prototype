# 🛍️ E-Commerce Prototype

![PHP](https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

Una moderna applicazione e-commerce full-stack costruita con PHP, JavaScript vanilla e CSS moderno. Questo progetto integra gestione del carrello, autenticazione utente, filtro prodotti e tema light/dark mode.

**Status**: Prototype di produzione  
**Versione**: 1.0.0  
**Licenza**: MIT

---

## ✨ Caratteristiche principali

- **🔐 Autenticazione utente**: Sistema di login/logout basato su sessioni PHP (mock login via randomuser.me)
- **🛒 Carrello persistente**: Gestione carrello in sessione server-side con sincronizzazione PHP-JavaScript
- **🎨 Tema dinamico**: Toggle light/dark mode con salvataggio persistente in localStorage
- **📱 Design responsive**: Layout mobile-first con hamburger menu
- **🔍 Filtro prodotti**: Sistema di filtri per categoria in tempo reale
- **📦 Checkout**: Flusso di acquisto completo con validazione dati
- **👤 Profilo utente**: Gestione dati utente e cronologia ordini
- **⚖️ GDPR Compliance**: Modale privacy policy globale, validazione privacy su form contatti
- **♿ Accessibilità**: Supporto ARIA labels e screenreader

---

## 🛠️ Stack tecnologico

| Tecnologia | Utilizzo |
| ----------- | ---------- |
| **PHP 7.4+** | Backend, gestione sessioni, elaborazione checkout |
| **MySQL/MariaDB** | (Pronto per integrazione) Database persistente |
| **JavaScript ES6+** | Interattività frontend, gestione DOM |
| **CSS3** | Styling modularizzato, animazioni, responsive design |
| **HTML5** | Markup semantico, SEO-friendly |
| **Material Symbols** | Iconografia Google |
| **Google Fonts** | Tipografia (Montserrat, Nunito, Titillium Web) |

---

## 📁 Struttura del progetto

```Text
ecommerce_Prototype/
├── index.php                    # Homepage principale
├── css/                         # Fogli di stile modularizzati
│   ├── style.css               # Stili globali
│   ├── cards.css               # Stile card prodotti
│   ├── cart.css                # Stile carrello e sidebar
│   ├── checkout.css            # Stile pagina checkout
│   ├── dettaglio.css           # Stile pagina dettaglio prodotto
│   ├── filter.css              # Stile sistema filtri
│   ├── hamburger.css           # Stile menu hamburger
│   ├── hero.css                # Stile hero section
│   ├── profile.css             # Stile pagina profilo
│   ├── side.css                # Stile side menu
│   ├── gdpr-compliance.css     # Stili modale privacy e form compliance
│   └── toggle.css              # Stile theme toggle
├── html/                        # Pagine statiche
│   ├── about.html              # Chi siamo
│   ├── contacts.html           # Contatti
│   ├── privacy-policy.html     # Privacy policy
│   ├── profile.html            # Profilo utente
│   └── services.html           # Servizi
├── php/                         # Backend PHP
│   ├── data.php                # Catalogo prodotti (mock data)
│   ├── set_session.php         # Gestione sessioni (login)
│   ├── logout_session.php      # Logout utente
│   ├── carrello.php            # Pagina carrello
│   ├── checkout.php            # Pagina checkout
│   └── dettaglio.php           # Pagina dettaglio prodotto
├── scripts/                     # JavaScript frontend
│   ├── carousel.js             # Slider/carousel prodotti
│   ├── cart.js                 # Gestione carrello e badge
│   ├── filterOverlay.js        # Sistema filtri prodotti
│   ├── gdpr-compliance.js      # Modale privacy policy, checkbox privacy form contatti
│   ├── menu.js                 # Hamburger menu e auth
│   └── profile.js              # Gestione profilo utente
└── img/                         # Asset immagini

```

---

## 🚀 Quick Start

### Prerequisiti

- **Server PHP**: 7.4 o superiore
- **Server HTTP**: Apache o Nginx
- **Browser**: Chrome, Firefox, Safari, Edge (versioni recenti)
- **localStorage**: Abilitato nel browser

### Installazione

A - **Clona il repository** oppure estrai i file:

```bash
git clone https://github.com/GianLucaVitale000/ecommerce-prototype.git
cd ecommerce-Prototype
```

B - **Configura il server locale**:

- Copia i file in una cartella servita dal tuo server PHP (es. `htdocs/` per XAMPP)
- Assicurati che PHP sia abilitato

C - **Accedi all'applicazione**:

```Text
http://localhost/ecommerce-Prototype/index.php
```

### Primo utilizzo

- Clicca sul **menu hamburger** in alto a sinistra
- Seleziona un prodotto per aggiungere al carrello
- Il badge del carrello si aggiorna automaticamente
- Accedi per procedere al checkout

---

## 📖 Documentazione

- **[Architecture](./docs/ARCHITECTURE.md)** - Architettura del progetto e design patterns
- **[API Reference](./docs/API.md)** - Endpoint PHP, sessioni e strutture dati

---

## 🔄 Flussi applicativi principali

### Flusso carrello

```Text
Selezione prodotto → POST form a carrello.php → Aggiorna $_SESSION['carrello'] → 
Redirect → updateCartBadge() e updateCartIcons() → Badge aggiornato → Carrello disponibile se loggato
```

### Flusso autenticazione

```Text
Login form → set_session.php → $_SESSION creata → localStorage['isLoggedIn']=true →
Carrello attivo → Checkout disponibile
```

### Flusso tema

```Text
Toggle checkbox → setTheme() → localStorage['darkMode'] = true/false → 
Applica classe .dark-mode a body → Salvataggio persistente tra sessioni
```

---

## 🔑 Componenti chiave

### Backend PHP

| File | Funzione |
| ------ | ---------- |
| `data.php` | Definisce catalogo prodotti (mock array) |
| `set_session.php` | Crea sessione utente al login |
| `logout_session.php` | Distrugge sessione utente |
| `carrello.php` | Visualizza e gestisce carrello |
| `checkout.php` | Form e logica checkout |
| `dettaglio.php` | Dettaglio singolo prodotto |

### Frontend JavaScript

| File | Funzione |
| ------ | ---------- |
| `cart.js` | Sincronizzazione badge carrello con sessione PHP |
| `menu.js` | Hamburger menu, login/logout, autenticazione |
| `filterOverlay.js` | Filtri prodotti per categoria |
| `profile.js` | Gestione dati profilo utente |
| `gdpr-compliance.js` | Modale privacy policy globale, validazione privacy form contatti (solo non loggati) |
| `carousel.js` | Slider prodotti showcases |

---

## 🎨 Tema e Customizzazione

### Dark Mode

Il progetto supporta il toggle light/dark mode:

- Default: Light mode
- Toggle disponibile nella side menu
- Salvataggio in `localStorage['darkMode']` come boolean (`true`/`false`)
- Applica dinamicamente la classe CSS `.dark-mode` a `<body>`

### Paletta colori del tema

I colori sono definiti con selettori hardcoded in `css/style.css`:

**Light Mode (default)**:

- Background: `#ffffff` (bianco)
- Testo: `#333333` (scuro)
- Accent: `#666666` (grigio)

**Dark Mode** (con classe `.dark-mode`):

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
  color: #ffd700;  /* gold hover effect */
}
```

---

## 📱 Responsive Design

Il progetto utilizza un approccio **mobile-first** con i seguenti breakpoint effettivi:

| Breakpoint | Dispositivo | Note |
| ----------- | ----------- | --- |
| **max-width: 600px** | Mobile | Font ridotto, layout compatto |
| **min-width: 768px** | Tablet | Layout multi-colonna |
| **max-width: 900px** | Tablet large / Mobile landscape | Overlay filtri, menu adattato |
| **min-width: 1024px** | Desktop | Layout completo |

**Strategie responsive implementate**:

- Menu hamburger per schermi piccoli (`< 900px`)
- Filtri overlay mobile (`max-width: 900px`)
- Layout adattativo per footer e contenuti
- Font size ottimizzato per readability su mobile

---

## 🔒 Sicurezza e privacy

**Misure di sicurezza implementate**:

- **Sessioni PHP**: Gestione stato utente tramite `$_SESSION` server-side
- **XSS Protection**: Output escaping con `htmlspecialchars()` nei template PHP per prevenire iniezioni di codice
- **GDPR Compliant**:
  
  - Modale privacy policy globale accessibile da tutte le pagine
  - Checkbox privacy sul modulo contatti (solo per non loggati)
  - Informativa privacy completa in `html/privacy-policy.html`

**Note di sicurezza**:

- ⚠️ **Input validation limitata**: Attualmente usato solo `htmlspecialchars()` per l'escaping. Manca validazione server-side per email, telefono, lunghezza campi
- ⚠️ **CSRF protection**: Non implementata (non sono presenti token CSRF nei form)
- **Consiglio per produzione**: Prima di deployare in produzione, implementare validazione robusta con `filter_var()`, regex patterns, e CSRF token

---

## 🐛 Debugging e development

### Console del browser

```javascript
// Verificare session status
localStorage.getItem('isLoggedIn')

// Controllare badge carrello
window.PHP_CART_COUNT

// Debug tema attivo
localStorage.getItem('darkMode')
```

### PHP debug

Aggiungi nel file desiderato:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

---

## 🚧 Roadmap future

- [ ] Integrazione database MySQL per persistenza dati
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Sistema di review e rating prodotti
- [ ] Email notifications per ordini
- [ ] Admin dashboard
- [ ] Analytics e tracking
- [ ] API REST per mobile app
- [ ] Cache optimization
- [ ] Multi-language support

---

## 📋 Requisiti di sistema

| Requisito | Minimo | Consigliato |
| ----------- | -------- | ----------- |
| PHP | 7.4 | 8.1+ |
| Browser | IE 11 | Chrome/Firefox latest |
| RAM Server | 512MB | 2GB |
| Storage | 50MB | 1GB |

---

## 📄 Licenza

Questo progetto è sotto licenza **MIT** - vedi il file [LICENSE](./LICENSE) per i dettagli.

---

## 👨‍💻 Autore

### Gian Luca Vitale

- **GitHub**: [GianLucaVitale000](https://github.com/GianLucaVitale000)
- **Email**: [gian.luca.vitale000@gmail.com](mailto:gian.luca.vitale000@gmail.com)
- **Data di creazione**: Aprile 2026

---

Sviluppato con ❤️ usando PHP, JavaScript e CSS vanilla
