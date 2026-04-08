# 📡 API Reference

Documentazione sui backend endpoints PHP e della gestione sessionisi.

---

## 🔐 Sessioni PHP

### Overview

Il sistema usa PHP sessions lato server per gestire:

- Autenticazione utente (login/logout)
- Carrello acquisti
- Sincronizzazione frontend-backend

### Session Structure

```php
// Quando l'utente fa login, viene salvato in:
$_SESSION['user'] = [
    'name' => 'Mario Rossi',
    'email' => 'mario@example.com',
    'picture' => 'https://...',
    'gender' => 'male',
    'nat' => 'IT'
    // ... altri dati ricevuti da frontend
];

// Carrello:
$_SESSION['carrello'] = [
    0 => [
        'id' => 2,
        'nome' => 'Prodotto 2',
        'prezzo' => 12.50,
        'quantita' => 1
    ],
    // ... altri articoli
];
```

**Nota**: Il login è attualmente **mock** (generato da randomuser.me nel frontend). Non there è validazione credenziali.

---

## 📍 Endpoint disponibili

### 1. Autenticazione

#### `POST /php/set_session.php`

**Descrizione**: Crea una sessione utente (riceve dati da frontend e li salva in `$_SESSION`)

**Parametri della richiesta** (JSON):

```javascript
{
  "name": "Mario Rossi",
  "email": "mario@example.com",
  "picture": "https://randomuser.me/api/portraits/...",
  "gender": "male",
  "nat": "IT"
}
```

**Risposta di successo (200)**:

```json
{
  "success": true
}
```

**Risposta errore (400)**:

```json
{
  "success": false,
  "error": "Dati non validi"
}
```

**Esempio uso (JavaScript)**:

```javascript
async function login(userData) {
  const response = await fetch('php/set_session.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('isLoggedIn', 'true');
    // User data già salvato in localStorage da menu.js
    location.reload();
  }
}
```

**Codice backend** (`php/set_session.php`):

```php
<?php
session_start();
$data = json_decode(file_get_contents('php://input'), true);
if ($data && isset($data['email'])) {
    $_SESSION['user'] = $data;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Dati non validi']);
}
?>
```

---

#### `GET /php/logout_session.php`

**Descrizione**: Distrugge la sessione utente (logout)

**Parametri**: Nessuno

**Risposta**:

```json
{
  "success": true
}
```

**Esempio uso (JavaScript)**:

```javascript
function logout() {
  fetch('php/logout_session.php')
    .then(() => {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('user');
      location.reload();
    });
}
```

**Codice backend** (`php/logout_session.php`):

```php
<?php
session_start();
unset($_SESSION['user']);
session_destroy();
echo json_encode(['success' => true]);
?>
```

---

### 2. Gestione Carrello

#### `GET /php/carrello.php`

**Descrizione**: Visualizza pagina carrello con lista prodotti nella sessione

**Prerequisiti**: Utente deve essere loggato (`$_SESSION['user']` deve esistere)

**Ritorna**: Pagina HTML con:

- Lista prodotti nel carrello (da `$_SESSION['carrello']`)
- Prezzo unitario e subtotale per ogni articolo
- Quantità e pulsanti modifica
- Totale carrello
- Pulsante svuota carrello

---

#### `POST /php/carrello.php`

**Descrizione**: Aggiorna carrello (add product oppure svuota)

**Parametri della richiesta** (POST form):

**Aggiungere prodotto:**

```TEXT
POST /php/carrello.php
Body: id=2  (Product ID)
```

**Svuotare carrello:**

```TEXT
POST /php/carrello.php
Body: svuota=true
```

**Esempio uso (HTML form)**:

```html
<!-- Aggiungere al carrello -->
<form action="php/carrello.php" method="post">
  <input type="hidden" name="id" value="2">
  <button type="submit">Aggiungi al carrello</button>
</form>

<!-- Svuotare carrello -->
<form action="php/carrello.php" method="post">
  <button type="submit" name="svuota" value="true">Svuota carrello</button>
</form>
```

**Comportamento backend** (`php/carrello.php`):

```php
<?php
session_start();
include 'data.php';

if (!isset($_SESSION['carrello'])) {
    $_SESSION['carrello'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['svuota'])) {
        $_SESSION['carrello'] = [];
    } elseif (isset($_POST['id'])) {
        $id = (int)$_POST['id'];
        // Cerca il prodotto
        $prodottoTrovato = null;
        foreach ($prodotti as $p) {
            if ($p['id'] === $id) {
                $prodottoTrovato = $p;
                break;
            }
        }
        
        if ($prodottoTrovato) {
            // Se già nel carrello, incrementa quantità
            $trovato = false;
            foreach ($_SESSION['carrello'] as &$item) {
                if ($item['id'] === $id) {
                    $item['quantita']++;
                    $trovato = true;
                    break;
                }
            }
            
            // Altrimenti aggiungi nuovo articolo
            if (!$trovato) {
                $_SESSION['carrello'][] = [
                    'id' => $prodottoTrovato['id'],
                    'nome' => $prodottoTrovato['nome'],
                    'prezzo' => $prodottoTrovato['prezzo'],
                    'quantita' => 1
                ];
            }
        }
    }
    
    // Redirect per evitare POST resubmission
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
```

---

### 3. Checkout

#### `GET /php/checkout.php`

**Descrizione**: Visualizza pagina checkout con riepilogo ordinazione

**Prerequisiti**: Sessione attiva con carrello presente

**Ritorna**: Pagina HTML con:

- Riepilogo prodotti nel carrello
- Form per dati spedizione (nome, email, indirizzo, etc.)
- Pulsante per confermare ordine

**Nota**: Al momento è una pagina statica HTML. La logica di payment/persistenza ordini dovrà essere implementata.

---

### 4. Dettagli Prodotto

#### `GET /php/dettaglio.php?id=2`

**Descrizione**: Visualizza dettagli di un singolo prodotto

**Parametri query**:

| Parametro | Tipo | Descrizione                      |
|-----------|------|----------------------------------|
| `id`      | int  | ID prodotto da 0 a 13 (required) |

**Prerequisiti**:

- ID prodotto must essere valido (0-13)
- Se utente non loggato: mostra pulsante "Accedi per acquistare"
- Se utente loggato: mostra form "Aggiungi al carrello"

**Risposta HTML**:

- Nome e descrizione del prodotto
- Immagine principale
- Prezzo
- Pulsante "Aggiungi al carrello" (se loggato) oppure "Accedi per acquistare" (se non loggato)

**Esempio URL**:

```html
<a href="php/dettaglio.php?id=5">Vedi dettagli prodotto 5</a>
```

**Codice backend** (`php/dettaglio.php`):

```php
<?php
session_start();
include "data.php";

$isLogged = isset($_SESSION['user']);
$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id === null || !isset($prodotti[$id])) {
    echo 'Prodotto non trovato.';
    exit;
}

$prodotto = $prodotti[$id];
// Mostra dettagli e form
?>
```

---

## 📦 Catalogo Prodotti

### Numero di prodotti

**Totale**: 14 prodotti (ID 0-13)

Ubicati in `php/data.php` dentro array `$prodotti[]`.

### Struttura prodotto

```php
$prodotto = [
    'id' => 0,                          // Identificativo univoco
    'nome' => 'Prodotto 1',             // Nome display
    'prezzo' => 9.99,                   // Prezzo in EUR
    'img' => 'https://placehold.co/300x200',  // URL immagine
    'descrizione' => 'Descrizione breve...',  // Descrizione breve
    'tipo 1' => true,                   // Flag categoria 1
    'tipo 2' => true,                   // Flag categoria 2
    'tipo 3' => false,                  // Flag categoria 3
    'tipo 4' => false                   // Flag categoria 4
];
```

### List prodotti

| ID | Nome | Prezzo | Tipo 1 | Tipo 2 | Tipo 3 | Tipo 4 |
| ---- | ------ | -------- | -------- | -------- | -------- | -------- |
| 0 | Prodotto 1 | 9.99 | ✓ | ✓ | | |
| 1 | Prodotto 2 | 12.50 | | ✓ | ✓ | |
| 2 | Prodotto 3 | 7.00 | ✓ | | | |
| 3 | Prodotto 4 | 15.00 | | ✓ | ✓ | |
| 4 | Prodotto 5 | 5.50 | ✓ | | | ✓ |
| 5 | Prodotto 6 | 5.50 | ✓ | | | ✓ |
| 6 | Prodotto 7 | 5.50 | ✓ | | ✓ | |
| 7 | Prodotto 8 | 5.50 | ✓ | | | |
| 8 | Prodotto 9 | 5.50 | ✓ | | | ✓ |
| 9 | Prodotto 10 | 5.50 | | ✓ | | |
| 10 | Prodotto 11 | 5.50 | | | ✓ | ✓ |
| 11 | Prodotto 12 | 5.50 | ✓ | | | |
| 12 | Prodotto 13 | 5.50 | | | ✓ | |
| 13 | Prodotto 14 | 5.50 | | ✓ | | |

### Badge carrello

Il badge carrello viene sincronizzato tramite:

1. **PHP calcola** il numero totale di articoli da `$_SESSION['carrello']`
2.
3. **Esporta come variabile JS** in `index.php`:

```php
<?php
$cartCount = 0;
if (isset($_SESSION['carrello'])) {
    foreach ($_SESSION['carrello'] as $item) {
        $cartCount += isset($item['quantita']) ? $item['quantita'] : 1;
    }
}
?>
<script>
  window.PHP_CART_COUNT = <?php echo json_encode($cartCount); ?>;
</script>
```

1. **JavaScript legge** in `cart.js`:

```javascript
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge && typeof window.PHP_CART_COUNT !== 'undefined') {
        badge.textContent = window.PHP_CART_COUNT;
    }
}
```

---

## 🧪 Testing degli endpoint

### Tool: cURL

```bash
# Add product to cart
curl -X POST http://localhost/ecommerce/php/carrello.php \
  -d "id=2"

# Logout
curl http://localhost/ecommerce/php/logout_session.php

# View product details
curl http://localhost/ecommerce/php/dettaglio.php?id=5
```

### Testing con Browser

1. Apri <http://localhost/ecommerce/index.php>
2. Clicca hamburger menu
3. Clicca "Login" - dati fittizia da randomuser.me
4. Seleziona un prodotto
5. Clicca "Aggiungi al carrello"
6. Controlla badge carrello aggiornato
7. Clicca sul badge carrello per visualizzare php/carrello.php
8. Clicca "Svuota carrello" per svuotare

---

## 📝 Note implementazione

- **Login è mock**: Usa dati fittizi da API randomuser.me
- **No database**: Tutti i dati in `php/data.php` (in memoria per sessione)
- **Session-based**: State è server-side in `$_SESSION`
- **localStorage**: Mantiene `isLoggedIn` flag per UI state
- **POST form**: Carrello usa form tradizionale, non AJAX JSON
- **Redirect after POST**: Evita resubmission al refresh pagina

---

## 📚 Riferimenti

- [PHP Sessions](https://www.php.net/manual/en/book.session.php)
- [randomuser.me API](https://randomuser.me/)
