/* ===========================================================
   FILE: cart.js
    DESCRIZIONE: Gestione stato carrello e accesso (index.php e carrello.php)
   AUTORE: [Gian Luca Vitale] - DATA: [24/04/2026]
=========================================================== */

/* 1) Quando la pagina si carica, viene eseguita la funzione updateCartIcons() (grazie a document.addEventListener('DOMContentLoaded', ...)).

2) updateCartIcons() controlla se l’utente è loggato leggendo localStorage.getItem('isLoggedIn').

3) Per l’icona carrello nella hero (.cart-icon-hero):
- Se loggato: il carrello è attivo, linka al carrello, titolo “Vai al carrello”.
- Se non loggato: il carrello è disabilitato, linka a #, titolo “Effettua il login”, e cliccando apre il menu laterale.
4) Per l’icona carrello nell’aside (.cart-icon-aside):
- Se loggato: il carrello è visibile, attivo, linka al carrello, titolo “Vai al carrello”.
- Se non loggato: il carrello è nascosto (display: none).
5) Quando fai login/logout (tramite menu.js), viene richiamata updateCartIcons(), così lo stato delle icone si aggiorna subito senza ricaricare la pagina.

 */

// Funzione per aggiornare lo stato del carrello (hero e aside)
function updateCartIcons() {
  // HERO
  const cartHero = document.querySelector(".cart-icon-hero");
  if (cartHero) {
    // Rimuovi tutti i listener click precedenti clonando il nodo
    const newCartHero = cartHero.cloneNode(true);
    cartHero.parentNode.replaceChild(newCartHero, cartHero);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      newCartHero.classList.remove("cart-disabled");
      newCartHero.setAttribute("href", "../php/carrello.php");
      newCartHero.setAttribute("title", "Vai al carrello");
    } else {
      newCartHero.classList.add("cart-disabled");
      newCartHero.setAttribute("href", "#");
      newCartHero.setAttribute("title", "Effettua il login");
      newCartHero.addEventListener("click", function (e) {
        e.preventDefault();
        const sideMenu = document.getElementById("sideMenu");
        if (sideMenu) sideMenu.classList.add("open");
      });
    }
  }
  // ASIDE (se presente)
  const cartAside = document.querySelector(".cart-icon-aside");
  if (cartAside) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      cartAside.classList.remove("cart-disabled");
      cartAside.setAttribute("href", "../php/carrello.php");
      cartAside.setAttribute("title", "Vai al carrello");
      cartAside.style.display = "";
    } else {
      cartAside.classList.add("cart-disabled");
      cartAside.setAttribute("href", "#");
      cartAside.setAttribute("title", "Effettua il login");
      cartAside.style.display = "none";
      // Rimuovo eventuali listener precedenti per evitare leak
      const newCartAside = cartAside.cloneNode(true);
      cartAside.parentNode.replaceChild(newCartAside, cartAside);
    }
  }
}
//
// GESTIONE BADGE CARRELLO (SINCRONIZZAZIONE PHP → JS):
// 1. Se la variabile globale window.PHP_CART_COUNT è definita (cioè se PHP ha esportato il numero prodotti carrello),
//    il badge viene aggiornato con questo valore (sincronizzato col backend).
// 2. Se la variabile non esiste (es. su altre pagine), il badge viene aggiornato leggendo dal localStorage (gestione JS lato client).
// 3. In questo modo il badge mostra sempre il numero reale di prodotti nel carrello, senza doppia gestione o chiamate AJAX.
//
// Funzione di aggiornamento:
function updateCartBadge() {
  let cartCount = 0;
  // Se la variabile globale PHP_CART_COUNT è definita, usa il suo valore
  if (typeof window.PHP_CART_COUNT !== "undefined") {
    cartCount = window.PHP_CART_COUNT;
  } else {
    try {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (Array.isArray(cart)) {
        cartCount = cart.reduce((sum, item) => sum + (item.quantita || 1), 0);
      }
    } catch (e) {}
  }
  // Badge su hero
  const cartHero = document.querySelector(".cart-icon-hero .cart-badge");
  if (cartHero) {
    if (cartCount > 0) {
      cartHero.textContent = cartCount;
      cartHero.style.display = "";
    } else {
      cartHero.style.display = "none";
    }
  }
  // Badge su aside
  const cartAside = document.querySelector(".cart-icon-aside .cart-badge");
  if (cartAside) {
    if (cartCount > 0) {
      cartAside.textContent = cartCount;
      cartAside.style.display = "";
    } else {
      cartAside.style.display = "none";
    }
  }
}
// Aggiorna icone carrello al caricamento della pagina
document.addEventListener("DOMContentLoaded", function () {
  updateCartIcons();
  updateCartBadge();
});

// Applica la preferenza tema dark da localStorage anche su carrello.php
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}
