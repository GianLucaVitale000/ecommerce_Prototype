/*
========================================
  menu.js — Funzionalità e Operatività
========================================

1. HAMBURGER & SIDE MENU
  - Gestisce l'apertura/chiusura del menu laterale tramite hamburger.
  - Gestisce l'apertura del menu cliccando su Accedi per acquistare (dettaglio.php).
  - Chiude il menu cliccando fuori o dopo click su Home (con reload se già su index.html).
  - In dettaglio.php: chiude il menu dopo il login e aggiorna il pulsante in "Aggiungi al carrello".

2. LIGHT/DARK MODE
  - Gestisce il toggle tra modalità chiara e scura.
  - Cambia logo in base al tema.
  - Salva e carica la preferenza tema da localStorage.

3. USER AVATAR & LOGIN
  - Gestisce login/logout fittizio (randomuser.me) e persistenza su localStorage.
  - Aggiorna avatar utente e visibilità icona logout.
  - Click su avatar porta a profile.html se loggati.

4. EVENTI E INIZIALIZZAZIONE
  - Inizializza avatar e listener su DOMContentLoaded.
  - Gestisce click su login, avatar e logout.
*/

// ========= 1 - HAMBURGER & SIDE MENU =========

// Hamburger menu toggle (indipendente)
const hamburger = document.querySelector(".hamburger");
const sideMenu = document.getElementById("sideMenu");
if (hamburger && sideMenu) {
  hamburger.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
  });
}

// Inizializzazione eventi su DOMContentLoaded (menu, avatar, login, ecc.)
document.addEventListener("DOMContentLoaded", () => {
  // --- Listener per Home nell'aside (menu laterale) ---
  if (sideMenu) {
    const homeLink = sideMenu.querySelector('a[aria-label="Home"]');
    if (homeLink) {
      homeLink.addEventListener("click", (e) => {
        const isHome =
          window.location.pathname.endsWith("index.php") ||
          window.location.pathname.endsWith("/");
        if (isHome) {
          e.preventDefault();
          window.location.reload();
        }
        sideMenu.classList.remove("open");
      });
    }
  }

  // Aggiorna l'avatar utente in base allo stato di login

  updateUserAvatar();

  // Gestione chiusura filtro mobile
  const filterSidebar = document.querySelector(".filter-sidebar");
  const closeFilterBtn = document.querySelector(".close-filter-btn");
  function isMobileFilterActive() {
    // Sidebar filtro in overlay mobile: position fixed e visibile
    return (
      filterSidebar &&
      window.getComputedStyle(filterSidebar).position === "fixed"
    );
  }
  if (closeFilterBtn && filterSidebar) {
    closeFilterBtn.addEventListener("click", () => {
      filterSidebar.style.display = "none";
      const mobileBtn = document.querySelector(".mobile-filter-btn");
      if (mobileBtn) mobileBtn.style.display = "flex";
    });
  }

  // (Opzionale) Mostra sidebar filtro se si clicca il bottone mobile-filter-btn
  const mobileBtn = document.querySelector(".mobile-filter-btn");
  if (mobileBtn && filterSidebar) {
    mobileBtn.addEventListener("click", () => {
      filterSidebar.style.display = "block";
      mobileBtn.style.display = "none";
    });
  }

  // Listener per il pulsante di login nell'aside
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (!isLoggedIn) fakeLogin();
    });
  }

  // Listener per il pulsante "Accedi per acquistare" in dettaglio.php
  const accediBtn = document.getElementById("accediBtn");
  if (accediBtn) {
    accediBtn.addEventListener("click", function (e) {
      e.preventDefault();
      if (sideMenu) sideMenu.classList.add("open");
      const asideLoginBtn = document.getElementById("loginBtn");
      if (asideLoginBtn) asideLoginBtn.focus();
    });
  }

  // Listener all'icona di logout
  const logoutIcon = document.getElementById("logoutIcon");
  if (logoutIcon) {
    logoutIcon.addEventListener("click", () => {
      if (isLoggedIn) fakeLogout();
    });
  }

  // Click su avatar porta a profile.html (se loggati)
  ["userAvatar", "profileAvatar"].forEach((id) => {
    const avatarDiv = document.getElementById(id);
    if (avatarDiv) {
      avatarDiv.style.cursor = "pointer";
      avatarDiv.addEventListener("click", () => {
        if (isLoggedIn) {
          // Se siamo già su profile.html non ricaricare
          const isProfile = window.location.pathname.endsWith("profile.html");
          if (!isProfile) {
            window.location.href = "../html/profile.html";
          }
        }
      });
    }
  });
});

// Chiudi aside cliccando fuori
document.addEventListener("click", (e) => {
  if (
    sideMenu.classList.contains("open") &&
    !sideMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    sideMenu.classList.remove("open");
  }
});

// ========= 2 - LIGHT/DARK MODE =========

// Toggle Light/Dark Mode
const toggleThemeCheckbox = document.getElementById("toggleTheme");

function setTheme(dark) {
  document.body.classList.toggle("dark-mode", dark);
  
  // Cambia tutti i loghi in base al tema
  document.querySelectorAll(".logo-img, .side-logo-img").forEach((logoImg) => {
    logoImg.src = dark
      ? "../img/logoipsum-365(dark).png"
      : "../img/logoipsum-365.png";
  });
  
  // Cambia la favicon in base al tema
  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    faviconLink.href = dark
      ? "/img/logoipsum-365(dark).png"
      : "/img/logoipsum-365.png";
  }
  
  // Aggiorna lo stato del toggle
  if (toggleThemeCheckbox) {
    toggleThemeCheckbox.checked = dark;
  }
}
// Carica preferenza da localStorage
const userPrefDark = localStorage.getItem("darkMode") === "true";
setTheme(userPrefDark);
// Ascolta cambiamenti del toggle
toggleThemeCheckbox?.addEventListener("change", () => {
  const isDark = toggleThemeCheckbox.checked;
  setTheme(isDark);
  localStorage.setItem("darkMode", isDark); // Salva preferenza su localStorage
});

// ====== 3 - USER AVATAR & LOGIN ======

// Stato login persistente su localStorage
let isLoggedIn = false;
let userData = null;
// Carica stato da localStorage
try {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  userData = JSON.parse(localStorage.getItem("userData")) || null;
} catch {}

// Funzione per aggiornare avatar e visibilità logout in base allo stato di login
function updateUserAvatar() {
  const avatarDiv = document.getElementById("userAvatar");
  if (!avatarDiv) return;
  avatarDiv.innerHTML = "";
  const logoutIcon = document.getElementById("logoutIcon");
  if (isLoggedIn && userData) {
    avatarDiv.classList.add("logged-in");
    avatarDiv.classList.remove("placeholder");
    // Mostra immagine utente
    const img = document.createElement("img");
    img.src = userData.picture?.thumbnail || userData.picture?.medium || "";
    img.alt = userData.name?.first || "Avatar";
    avatarDiv.appendChild(img);
    if (logoutIcon) logoutIcon.classList.add("visible");
  } else {
    // Nessun contenuto interno: il background SVG funge da placeholder
    avatarDiv.classList.remove("logged-in");
    avatarDiv.classList.add("placeholder");
    if (logoutIcon) logoutIcon.classList.remove("visible");
  }
}

// Login fittizio e fetch dati randomuser.me
async function fakeLogin() {
  const res = await fetch("https://randomuser.me/api/?nat=it");
  const data = await res.json();
  userData = data.results[0];
  isLoggedIn = true;
  // Salva su localStorage
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userData", JSON.stringify(userData));
  // Reset carrello e badge per nuovo utente
  localStorage.removeItem("cart");
  window.PHP_CART_COUNT = 0;
  if (typeof updateCartBadge === "function") updateCartBadge();
  updateUserAvatar();
  if (typeof updateCartIcons === "function") updateCartIcons();
  // Aggiorna la sessione PHP lato server
  fetch("../php/set_session.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  // Se siamo su dettaglio.php, aggiorna il pulsante accediBtn in "Aggiungi al carrello"
  const accediBtn = document.getElementById("accediBtn");
  if (accediBtn) {
    // Sostituisci con form per aggiunta al carrello
    const dettaglioActions = accediBtn.closest(".dettaglio-actions");
    if (dettaglioActions) {
      const prodottoId = new URLSearchParams(window.location.search).get("id");
      dettaglioActions.innerHTML = `
        <form action="carrello.php" method="post">
          <input type="hidden" name="id" value="${prodottoId}">
          <button type="submit">Aggiungi al carrello</button>
        </form>
      `;
    }
  }
}
// Logout fittizio
function fakeLogout() {
  isLoggedIn = false;
  userData = null;
  // Rimuovi da localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userData");
  localStorage.removeItem("cart");
  window.PHP_CART_COUNT = 0;
  if (typeof updateCartBadge === "function") updateCartBadge();
  // Chiama logout_session.php per distruggere la sessione PHP
  fetch("../php/logout_session.php", { method: "POST" });
  updateUserAvatar();
  if (typeof updateCartIcons === "function") updateCartIcons();
}

// ========= 4 - EVENTI E INIZIALIZZAZIONE =========

// Aggiorna avatar al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  updateUserAvatar();
  // Listener per il pulsante di login nell'aside
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (!isLoggedIn) fakeLogin();
    });
  }

  // Listener per il pulsante "Accedi per acquistare" in dettaglio.php
  const accediBtn = document.getElementById("accediBtn");
  if (accediBtn) {
    accediBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const sideMenu = document.getElementById("sideMenu");
      if (sideMenu) sideMenu.classList.add("open");
      const asideLoginBtn = document.getElementById("loginBtn");
      if (asideLoginBtn) asideLoginBtn.focus();
    });
  }

  // Click su avatar porta a profile.html (se loggati)
  ["userAvatar", "profileAvatar"].forEach((id) => {
    const avatarDiv = document.getElementById(id);
    if (avatarDiv) {
      avatarDiv.style.cursor = "pointer";
      avatarDiv.addEventListener("click", () => {
        if (isLoggedIn) {
          // Se siamo già su profile.html non ricaricare
          const isProfile = window.location.pathname.endsWith("profile.html");
          if (!isProfile) {
            window.location.href = "../html/profile.html";
          }
        }
      });
    }
  });
});

/* 1. Login/logout
Quando fai login/logout, vengono chiamate le funzioni fakeLogin() o fakeLogout() in menu.js.
Queste funzioni:
Aggiornano lo stato di login in localStorage.
Azzerano il carrello (localStorage.cart e window.PHP_CART_COUNT = 0).
Aggiornano subito il badge e le icone carrello con updateCartBadge() e updateCartIcons().

2. Caricamento pagina
Al caricamento della pagina, vengono eseguite:
updateCartIcons() per abilitare/disabilitare le icone carrello (hero e aside) in base allo stato di login.
updateCartBadge() per mostrare il numero di prodotti nel badge.

3. Sincronizzazione badge
updateCartBadge() controlla:
Se esiste la variabile globale window.PHP_CART_COUNT (impostata da PHP su index.php), usa quel valore.
Altrimenti, legge il carrello da localStorage.
Così il badge è sempre sincronizzato con il backend (PHP) o con il carrello locale (JS).

4. Cambio utente
Quando effettui il login con un nuovo utente:
Il carrello viene azzerato (localStorage e badge).
Il backend PHP aggiorna la sessione per il nuovo utente.
Il badge mostra sempre il carrello corretto per l’utente attivo.

5. Logout
Quando fai logout:
Viene svuotato il carrello e azzerato il badge.
Le icone carrello vengono disabilitate o nascoste.
*/
