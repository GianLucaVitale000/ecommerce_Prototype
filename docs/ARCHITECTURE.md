# 🏗️ Architettura del Progetto

Panoramica della struttura, flussi dati e componenti dell'e-commerce prototype.

---

## 📁 Struttura File

```TEXT
ecommerce_Prototype/
├── index.php                    # Homepage - carica catalogo e controlla login
├── css/                         # Stili modularizzati
│   ├── style.css               # Variabili CSS, reset globale, layout base
│   ├── hero.css                # Hero section, banner principale
│   ├── cards.css               # Grid prodotti e card styling
│   ├── filter.css              # Overlay filtri, pulsanti categoria
│   ├── cart.css                # Sidebar carrello, badge
│   ├── hamburger.css           # Menu hamburger responsive
│   ├── toggle.css              # Theme toggle (dark/light)
│   ├── checkout.css            # Form checkout
│   ├── dettaglio.css           # Pagina dettaglio prodotto
│   ├── profile.css             # Pagina profilo utente
│   ├── gdpr-compliance.css     # Stili modale e form compliance
│   └── side.css                # Side menu, sidebar
├── php/                         # Backend server-side
│   ├── data.php                # Catalogo prodotti (14 prodotti, mock array)
│   ├── set_session.php         # POST /php/set_session.php - Login utente
│   ├── logout_session.php      # Logout - destroySessione
│   ├── carrello.php            # Pagina carrello, sincronizzazione badge
│   ├── checkout.php            # Form checkout e elaborazione
│   └── dettaglio.php           # Pagina dettaglio singolo prodotto
├── scripts/                     # Frontend JavaScript ES6+
│   ├── cart.js                 # Gestione badge carrello, icone carrello
│   ├── menu.js                 # Hamburger menu, login/logout, fakeLogin()
│   ├── filterOverlay.js        # Sistema filtri prodotti per categoria
│   ├── profile.js              # Gestione profilo, dati utente
│   ├── gdpr-compliance.js      # Modale Privacy Policy globale, checkbox privacy form contatti, validazione compliance
│   └── carousel.js             # Slider/carousel prodotti
├── html/                        # Pagine statiche
│   ├── about.html              # Chi siamo
│   ├── contacts.html           # Contatti
│   ├── privacy-policy.html     # Privacy policy
│   ├── profile.html            # Profilo utente
│   └── services.html           # Servizi
├── img/                         # Asset immagini
├── README.md                    # Overview e quick start
├── LICENSE                      # MIT License
└── .gitignore                   # Git ignore rules
```

---

## 🔐 Flusso Autenticazione

### Login Flow (Mock)

```TEXT
User clicks "Login" → fakeLogin() in menu.js
    ↓
fetch('php/set_session.php', { 
  method: 'POST', 
  body: JSON.stringify(userData)
})
    ↓
set_session.php:
  → _SESSION['user'] = userData
  → Returns success
    ↓
JavaScript side:
  → localStorage.isLoggedIn = 'true'
  → updateCartIcons() - abilita carrello
  → updateCartBadge() - mostra badge
  → Side menu si chiude
```

### Dati Utente (Mock da randomuser.me)

Nella console, la funzione `fakeLogin()` genera dati:

```javascript
{
  name: { first: "...", last: "..." },
  email: "...",
  picture: { medium: "..." },
  gender: "...",
  nat: "..."
}
```

**Importante**: Nessuna validazione di username/password. Il mock login simula semplicemente che l'utente acceda con dati casuali.

### Logout Flow

```TEXT
User clicks "Logout" → fakeLogout() in menu.js
    ↓
localStorage.clear() o specifiche chiavi
    ↓
window.location.href = 'php/logout_session.php'
    ↓
PHP: session_destroy()
    ↓
Redirect a index.php
```

---

## 🛒 Flusso Carrello

### Architettura Duale: localStorage + PHP

Il carrello ha **due fonti di verità** a seconda del contesto:

#### Quando NON loggato

```TEXT
User selects product → cart.js
    ↓
localStorage.cart = [{id, nome, prezzo, quantita}, ...]
    ↓
updateCartBadge() legge localStorage.cart
    ↓
Badge mostra quantità totale
```

**Persistenza**: Il carrello rimane fino a che l'utente non pulisce localStorage o fa logout.

#### Quando loggato

```TEXT
User logged in → carrello.php page

PHP side:
  → Controlla $_SESSION['user']
  → Gestisce $_SESSION['carrello']
  
JS side:
  → updateCartBadge() legge window.PHP_CART_COUNT
  → window.PHP_CART_COUNT è impostato da PHP via <script>
  → Sincronizzazione: PHP ↔ JS (badge)
```

### Operazioni carrello

| Operazione | Loggato? | Storage | Endpoint |
| ----------- | ---------- | --------- | ---------- |
| **Aggiungi** | No | localStorage | JS solo |
| **Aggiungi** | Sì | $_SESSION['carrello'] + localStorage | php/carrello.php (POST) |
| **Svuota** | No | localStorage | JS solo |
| **Svuota** | Sì | $_SESSION + localStorage | php/carrello.php (POST svuota=1) |
| **View** | Sì | $_SESSION | php/carrello.php (GET) |

### Formato Carrello

```javascript
// localStorage.cart (JSON stringify)
[
  { id: 3, nome: "Prodotto", prezzo: 12.99, quantita: 2 },
  { id: 7, nome: "Altro", prezzo: 8.50, quantita: 1 }
]

// $_SESSION['carrello'] (PHP array)
Array (
  [0] => Array (id => 3, nome => Prodotto, prezzo => 12.99, quantita => 2),
  [1] => Array (id => 7, nome => Altro, prezzo => 8.50, quantita => 1)
)
```

---

## 🎨 Flusso Tema (Dark/Light Mode)

```TEXT
User clicks theme toggle → toggleTheme() in menu.js
    ↓
localStorage.theme = 'dark' or 'light'
    ↓
updateTheme() applica variabili CSS:
  → document.documentElement.style.setProperty(
      '--bg-color', isDark ? '#1a1a1a' : '#ffffff'
    )
    ↓
CSS variables aggiorno colori globali
    ↓
Persistenza: tema salvato tra sessioni
```

### Variabili CSS

Definite in `css/style.css`:

```css
:root {
  --primary-color: #007bff;
  --text-color: #333;
  --bg-color: #ffffff;
  --border-color: #ddd;
  /* ... altri colori */
}

[data-theme="dark"] {
  --text-color: #fff;
  --bg-color: #1a1a1a;
  --border-color: #444;
}
```

---

## 📊 Componenti Backend

### data.php

- **Contenuto**: Array `$prodotti[]` con 14 prodotti (ID 0-13)
- **Campi prodotto**: id, nome, prezzo, img, descrizione, tipo1-4 (boolean flags)
- **Uso**: Incluso da index.php per mostrare catalogo
- **Persistenza**: Solo in memoria (HTTP request)

### set_session.php

- **Metodo**: POST (JSON)
- **Parametri**: userData (object con name, email, picture, etc)
- **Effetto**: `$_SESSION['user'] = $_POST data`
- **Return**: JSON `{"success": true}`
- **Validazione**: NESSUNA (mock login)

### logout_session.php

- **Metodo**: GET
- **Effetto**: `unset($_SESSION['user'])`, `session_destroy()`
- **Return**: JSON `{"success": true}`

### carrello.php

- **Metodo**: POST (form data, non JSON)
- **Parametri**: `id` (product ID) o `svuota` (empty cart flag)
- **Effetto**: Modifica `$_SESSION['carrello']`
- **Output**: HTML page con lista carrello
- **Redirect**: POST-Redirect-GET per evitare resubmission

### checkout.php

- **Metodo**: POST (form data)
- **Parametri**: nome, cognome, email, indirizzo, etc
- **Effetto**: Valida dati, elabora ordine
- **Output**: Pagina conferma ordine
- **Database**: N/A (mock - non salvato)

### dettaglio.php

- **Metodo**: GET (`?id=N`)
- **Verifica**: Controlla `isset($_SESSION['user'])`
- **Output**
  - Se loggato: Mostra "Aggiungi al carrello"
  - Se non loggato: Link "Accedi per acquistare"

---

## 🎯 Componenti Frontend

### cart.js

- **Funzione**: Gestisce badge carrello, sincronizza localStorage ↔ PHP
- **Esporta**: `updateCartIcons()`, `updateCartBadge()`
- **Dipende da**: localStorage.cart, window.PHP_CART_COUNT

### menu.js

- **Funzione**: Hamburger menu, login/logout, theme toggle
- **Esporta**: `fakeLogin()`, `fakeLogout()`, `toggleTheme()`
- **Dipende da**: localStorage.isLoggedIn, localStorage.theme

### filterOverlay.js

- **Funzione**: Sistema filtri per categoria (tipo1-4)
- **Interazione**: Click pulsanti categoria → filtra grid prodotti
- **DOM**: Crea overlay dinamico

### profile.js

- **Funzione**: Visualizza dati profilo utente
- **Fonte dati**: `$_SESSION['user']` renderizzato in HTML da HTML/profile.html
- **Interazione**: Recupera email, foto, nome da pagina

### gdpr-compliance.js

- **Funzione**: Modale privacy policy globale, gestione validazione privacy su form contatti
- **Scope**: Modale accessibile da tutte le pagine, checkbox privacy solo su contacts.html per non loggati
- **Interazione**: Click link privacy apre modale, checkbox blocca submit form finché non accettato

### carousel.js

- **Funzione**: Slider prodotti su homepage
- **Interazione**: Prev/next buttons, swipe support
- **DOM**: Anima transizioni tra slide

---

## 🔄 Flussi Dati Principali

### Flusso Visualizzazione Prodotti

```TEXT
index.php caricato
    ↓
PHP include 'php/data.php'
    ↓
Render HTML foreach $prodotti[]
    ↓
JavaScript filterOverlay.js aggiunge listener click filtri
    ↓
User click filtro → nasconde/mostra card prodotto
```

### Flusso Checkout

```TEXT
User loggato → clicca "Acquista"
    ↓
Redirect a php/checkout.php
    ↓
Form con campi: nome, cognome, email, indirizzo, cap, città
    ↓
Submit POST → checkout.php valida
    ↓
Mostra pagina conferma ordine
    ↓
localStorage.cart svuotato (optional)
```

### Flusso Cambio Tema

```TEXT
User clicca toggle dark/light
    ↓
menu.js toggleTheme()
    ↓
localStorage.theme aggiornato
    ↓
updateTheme() applica variabili CSS :root
    ↓
Pagina ridisegnata con nuovi colori
    ↓
Tema persiste tra sessioni
```

---

## 💾 Storage Locations

| Dato | Storage | Persistenza | Scope |
| ------ | --------- | ------------- | ------- |
| **Utente loggato flag** | localStorage.isLoggedIn | Sessione browser | Client |
| **Dati utente mock** | localStorage.userData | Sessione browser | Client (da randomuser.me) |
| **Dati utente sessione** | $_SESSION['user'] | Sessione server | Server (sincronizzato da client) |
| **Tema** | localStorage.theme | Permanently | Client |
| **Carrello** | localStorage.cart | Permanently* | Client |
| **Carrello PHP** | $_SESSION['carrello'] | Sessione server | Server |
| **Catalogo** | $prodotti[] (data.php) | Request lifecycle | Server |

*_Carrello localStorage persiste finché non pulito manualmente o logout_

---

## ⚙️ Flusso Richieste HTTP

### GET index.php

```TEXT
Browser → Apache
  ↓
PHP esegue:
  session_start()
  include 'php/data.php'
  include 'php/set_session.php' (se form login)
  Render HTML catalogo
  ↓
Risposta: HTML + CSS + JS links
```

### POST php/set_session.php (Login)

```TEXT
JavaScript fetch()
  ↓
Backend:
  $_POST = JSON.parse($_POST)
  $_SESSION['user'] = data
  return {success: true}
  ↓
JavaScript riceve JSON
  ↓
localStorage.isLoggedIn = true
  ↓
Page redirect x /index.php
```

### POST php/carrello.php (Add to cart)

```TEXY
HTML form submit (se loggato) OR JavaScript fetch (se non loggato)
  ↓
Backend:
  Verifica $_POST['id']
  Aggiunge a $_SESSION['carrello']
  Redirect POST-GET pattern
  ↓
Risposta: HTML pagina carrello
```

### GET php/logout_session.php

```TEXT
JavaScript window.location = 'php/logout_session.php'
  ↓
Backend:
  unset($_SESSION['user'])
  session_destroy()
  Redirect index.php
  ↓
Server: Session terminata
Browser: Torna a index.php non loggato
```

---

## 🚫 Limitazioni (Prototype)

| Limitazione | Motivo |
| ----------- | -------- |
| **No database** | Prototype - tutto in memoria |
| **No login reale** | Mock login con randomuser.me |
| **Carrello non persiste** | Perduto con browser clear/logout |
| **No pagamento reale** | Mock checkout, nessuna elaborazione |
| **No email** | Sistema notifiche non implementato |
| **No ordini** | Non salvati - prototype only |
| **No admin panel** | Gestione prodotti via PHP hardcoded |

---

## 🔗 Prossimi Step per Produzione

## Per abilitare un vero database

1. Creare schema MySQL (tabelle: users, products, orders, order_items)
2. Rimpiazzare `$_SESSION['carrello']` con query database
3. Implementare autenticazione reale (hasher password, JWT tokens)
4. Aggiungere API REST endpoints
5. Implementare payment gateway (Stripe, PayPal)

## Per scalabilità

1. Framework (Laravel, Symfony)
2. ORM (Eloquent, Doctrine)
3. Docker containerization
4. Load balancing
5. CDN per asset statici
