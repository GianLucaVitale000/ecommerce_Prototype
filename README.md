# 🛍️ E-Commerce Prototype

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
|-----------|----------|
| **PHP 7.4+** | Backend, gestione sessioni, elaborazione checkout |
| **MySQL/MariaDB** | (Pronto per integrazione) Database persistente |
| **JavaScript ES6+** | Interattività frontend, gestione DOM |
| **CSS3** | Styling modularizzato, animazioni, responsive design |
| **HTML5** | Markup semantico, SEO-friendly |
| **Material Symbols** | Iconografia Google |
| **Google Fonts** | Tipografia (Montserrat, Nunito, Titillium Web) |

---

## 📁 Struttura del progetto

```
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

1. **Clona il repository** oppure estrai i file:
```bash
git clone https://github.com/tuousername/ecommerce-prototype.git
cd ecommerce-Prototype
```

2. **Configura il server locale**:
   - Copia i file in una cartella servita dal tuo server PHP (es. `htdocs/` per XAMPP)
   - Assicurati che PHP sia abilitato

3. **Accedi all'applicazione**:
```
http://localhost/ecommerce-Prototype/index.php
```

### Primo utilizzo
- Clicca sul **menu hamburger** in alto a sinistra
- Seleziona un prodotto per aggiungere al carrello
- Il badge del carrello si aggiorna automaticamente
- Accedi per procedere al checkout

---

## 📖 Documentazione

- **[Installation Guide](./docs/INSTALLATION.md)** - Setup e configurazione (XAMPP, Docker, VPS)
- **[API Reference](./docs/API.md)** - Endpoint PHP, sessioni e strutture dati

---

## 🔄 Flussi applicativi principali

### Flusso carrello
```
Selezione prodotto → add_to_cart() → $_SESSION['carrello'] → 
updateCartIcons() → Badge aggiornato → Carrello disponibile se loggato
```

### Flusso autenticazione
```
Login form → set_session.php → $_SESSION creata → localStorage['isLoggedIn']=true →
Carrello attivo → Checkout disponibile
```

### Flusso tema
```
Toggle dark/dark → localStorage['theme'] → CSS attiva variabili --
Salvataggio persistente tra sessioni
```

---

## 🔑 Componenti chiave

### Backend PHP

| File | Funzione |
|------|----------|
| `data.php` | Definisce catalogo prodotti (mock array) |
| `set_session.php` | Crea sessione utente al login |
| `logout_session.php` | Distrugge sessione utente |
| `carrello.php` | Visualizza e gestisce carrello |
| `checkout.php` | Form e logica checkout |
| `dettaglio.php` | Dettaglio singolo prodotto |

### Frontend JavaScript

| File | Funzione |
|------|----------|
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
- Salvataggio in `localStorage['theme']`

### Colori e variabili CSS
Le variabili CSS sono definite in `css/style.css`:

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  /* ... altre variabili */
}
```

---

## 📱 Responsive Design

| Breakpoint | Dispositivo |
|-----------|-----------|
| 320px-479px | Mobile piccolo |
| 480px-767px | Mobile grande |
| 768px-1023px | Tablet |
| 1024px+ | Desktop |

---

## 🔒 Sicurezza e privacy

- **Sessioni PHP**: Token-based session management
- **Input validation**: Server-side validation nei form
- **XSS Protection**: Output escaping nei template
- **CSRF**: Token protection nei form
- **GDPR Compliant**: Modale privacy policy, validazione consenso privacy su form contatti
- **Privacy Policy**: Informativa privacy completa accessibile da tutte le pagine

---

## 🐛 Debugging e development

### Console del browser
```javascript
// Verificare session status
localStorage.getItem('isLoggedIn')

// Controllare badge carrello
window.PHP_CART_COUNT

// Debug tema attivo
localStorage.getItem('theme')
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
|-----------|--------|-----------|
| PHP | 7.4 | 8.1+ |
| Browser | IE 11 | Chrome/Firefox latest |
| RAM Server | 512MB | 2GB |
| Storage | 50MB | 1GB |

---

## 🤝 Contributing

Per contribuire al progetto, apri una Pull Request con le tue modifiche.

---

## 📄 Licenza

Questo progetto è sotto licenza **MIT** - vedi il file [LICENSE](./LICENSE) per i dettagli.

---

## 👨‍💻 Autore

**Gian Luca Vitale**
- GitHub: [@yourusername]
- Email: [your.email@example.com]
- Data di creazione: Aprile 2026

---

## 🆘 Support e Issues

Riscontri bug o hai domande?
- Apri un [GitHub Issue](https://github.com/yourusername/ecommerce-prototype/issues)
- Consulta la [documentazione](./docs/INSTALLATION.md)

---

**Sviluppato con ❤️ usando PHP, JavaScript e CSS vanilla**
