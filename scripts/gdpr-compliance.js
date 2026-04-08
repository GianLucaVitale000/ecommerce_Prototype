/* ===========================================================
   FILE: gdpr-compliance.js
   DESCRIZIONE: Gestione completa della compliance GDPR
                1. Modale Privacy Policy accessibile da tutte le pagine
                2. Checkbox privacy sul modulo contatti (solo per non loggati)
                3. Blocco submit finché non si accetta l'informativa
   AUTORE: [Gian Luca Vitale] - DATA: [05/04/2026]
=========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // ========== PARTE 1: MODALE PRIVACY POLICY (GLOBALE) ==========

  /**
   * Crea e gestisce la modale della privacy policy
   */
  function createPrivacyModal() {
    if (document.getElementById("globalPrivacyModal")) {
      return document.getElementById("globalPrivacyModal");
    }

    const modalHTML = `
    <div class="modal-overlay" id="globalPrivacyModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Informativa sulla Privacy</h2>
          <button type="button" class="modal-close-btn" id="globalModalCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          <h3>Titolare del Trattamento</h3>
          <p>Il titolare del trattamento dei dati personali è [Nome Azienda], con sede in [Indirizzo].</p>

          <h3>Finalità del Trattamento</h3>
          <p>I dati personali raccolti tramite il nostro sito web vengono trattati per le seguenti finalità:</p>
          <ul>
            <li>Rispondere alle richieste di contatto inviate tramite il modulo contatti</li>
            <li>Fornire i servizi richiesti</li>
            <li>Inviare comunicazioni relative alle tue richieste</li>
            <li>Adempiere obblighi legali e normativi</li>
            <li>Proteggere i diritti, la privacy e la sicurezza di utenti e del sito</li>
          </ul>

          <h3>Base Legale del Trattamento</h3>
          <p>Il trattamento dei tuoi dati personali è basato su:</p>
          <ul>
            <li><strong>Consenso esplicito</strong> – Quando fornisci i tuoi dati tramite il modulo contatti, accetti esplicitamente il trattamento mediante questa informativa.</li>
            <li><strong>Esecuzione di un contratto</strong> – Quando effettui l'iscrizione al nostro servizio e fornisci i dati necessari.</li>
            <li><strong>Obblighi legali</strong> – Conformità a leggi e normative applicabili.</li>
          </ul>

          <h3>Dati Personali Raccolti</h3>
          <p>A seconda del contesto, raccogliamo i seguenti dati:</p>
          <ul>
            <li>Nome e cognome</li>
            <li>Indirizzo email</li>
            <li>Numero di telefono (se fornito)</li>
            <li>Messaggi e contenuti inviati tramite il modulo contatti</li>
            <li>Dati di navigazione (IP, browser, dispositivo)</li>
          </ul>

          <h3>Periodo di Conservazione</h3>
          <p>I dati personali vengono conservati per il periodo necessario a raggiungere le finalità dichiarate. In generale: Dati da modulo contatti: 3 anni dal ricevimento.</p>

          <h3>Diritti dell'Interessato</h3>
          <p>Ai sensi del Regolamento (UE) 2016/679 (GDPR), hai diritto a:</p>
          <ul>
            <li>Diritto di accesso</li>
            <li>Diritto di rettifica</li>
            <li>Diritto di cancellazione</li>
            <li>Diritto di limitazione del trattamento</li>
            <li>Diritto alla portabilità dei dati</li>
            <li>Diritto di opposizione</li>
          </ul>
          <p>Per esercitare questi diritti, contattaci a: privacy@example.com</p>

          <h3>Sicurezza dei Dati</h3>
          <p>Implementiamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazione o distruzione.</p>

          <h3>Contatti</h3>
          <p>
            <strong>Email:</strong> privacy@example.com<br>
            <strong>Data ultimo aggiornamento:</strong> 5 aprile 2026
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-close-modal" id="globalModalCloseFooterBtn">Chiudi</button>
        </div>
      </div>
    </div>
    `;

    const temp = document.createElement("div");
    temp.innerHTML = modalHTML;
    const modal = temp.firstElementChild;

    // Aggiungi CSS se non esiste
    if (!document.querySelector("style[data-modal-styles]")) {
      const style = document.createElement("style");
      style.setAttribute("data-modal-styles", "true");
      style.textContent = `
        .modal-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          align-items: center;
          justify-content: center;
        }
        .modal-overlay.active {
          display: flex;
        }
        .modal-content {
          background-color: var(--bg-color, #fff);
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          color: var(--text-color, #333);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e0e0e0;
          flex-shrink: 0;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 1.5rem;
        }
        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-color, #333);
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-close-btn:hover {
          opacity: 0.7;
        }
        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
        }
        .modal-body h3 {
          font-size: 1.2rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .modal-body h3:first-child {
          margin-top: 0;
        }
        .modal-body p, .modal-body ul {
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }
        .modal-body ul {
          margin-left: 1.5rem;
        }
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          flex-shrink: 0;
        }
        .modal-footer button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-close-modal {
          background-color: var(--primary-color, #007bff);
          color: white;
        }
        .btn-close-modal:hover {
          opacity: 0.9;
        }
        body.dark-mode .modal-content {
          background-color: #1e1e1e;
          color: #e0e0e0;
        }
        body.dark-mode .modal-header {
          border-bottom-color: #333;
        }
        body.dark-mode .modal-footer {
          border-top-color: #333;
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(modal);

    const closeBtn = document.getElementById("globalModalCloseBtn");
    const closeFooterBtn = document.getElementById("globalModalCloseFooterBtn");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }

    if (closeFooterBtn) {
      closeFooterBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });

    return modal;
  }

  // Setup link Privacy Policy dal footer (tutte le pagine)
  // Selector 1: Cerca tutti gli elementi con classe privacy-policy-link
  const privacyLinks = document.querySelectorAll(".privacy-policy-link");

  if (privacyLinks.length > 0) {
    privacyLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const modal = createPrivacyModal();
        modal.classList.add("active");
      });
    });
  }

  // Selector 2: Fallback esplicito per il footer su tutte le pagine
  const footerPrivacyLink = document.querySelector("footer .privacy-policy-link");
  if (footerPrivacyLink && !footerPrivacyLink._gdprListenerAdded) {
    footerPrivacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      const modal = createPrivacyModal();
      modal.classList.add("active");
    });
    footerPrivacyLink._gdprListenerAdded = true;
  }

  // ========== PARTE 2: MODULO CONTATTI (SOLO SU CONTACTS.HTML) ==========

  const contactForm = document.getElementById("contactForm");
  if (!contactForm) {
    return;
  }

  const gdprSection = document.getElementById("gdprSection");
  const gdprCheckbox = document.getElementById("gdprCheckbox");
  const submitBtn = document.getElementById("submitBtn");
  const privacyLink = document.getElementById("privacyLink");
  const privacyModal = document.getElementById("privacyModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalCloseFooterBtn = document.getElementById("modalCloseFooterBtn");

  let privacyModalOpenedFromForm = false;

  // === FUNZIONI UTILI ===

  function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }

  function initializeFormState() {
    const loggedIn = isUserLoggedIn();

    if (loggedIn) {
      gdprSection.style.display = "none";
      submitBtn.disabled = false;
    } else {
      gdprSection.style.display = "block";
      submitBtn.disabled = true;
      gdprCheckbox.checked = false;
    }
  }

  function openPrivacyModalFromForm(openedFromForm = false) {
    privacyModalOpenedFromForm = openedFromForm;
    privacyModal.classList.add("active");
  }

  function closePrivacyModalFromForm() {
    privacyModal.classList.remove("active");

    if (privacyModalOpenedFromForm) {
      gdprCheckbox.checked = true;
      submitBtn.disabled = false;
      privacyModalOpenedFromForm = false;
    }
  }

  function updateSubmitButtonState() {
    if (isUserLoggedIn()) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = !gdprCheckbox.checked;
    }
  }

  // === EVENT LISTENERS ===

  privacyLink.addEventListener("click", function (e) {
    e.preventDefault();
    openPrivacyModalFromForm(true);
  });

  // Link Privacy Policy nel footer - solo se contactForm esiste
  // Nota: footerPrivacyLink è già dichiarato nella sezione globale
  // Qui aggiungiamo un listener aggiuntivo per il comportamento specifico del form
  if (footerPrivacyLink) {
    footerPrivacyLink.addEventListener("click", function (e) {
      e.preventDefault();
      openPrivacyModalFromForm(false);
    });
  }

  modalCloseBtn.addEventListener("click", function () {
    closePrivacyModalFromForm();
  });

  modalCloseFooterBtn.addEventListener("click", function () {
    closePrivacyModalFromForm();
  });

  privacyModal.addEventListener("click", function (e) {
    if (e.target === privacyModal && !privacyModalOpenedFromForm) {
      closePrivacyModalFromForm();
    }
  });

  gdprCheckbox.addEventListener("change", updateSubmitButtonState);

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!isUserLoggedIn() && !gdprCheckbox.checked) {
      alert("Devi accettare l'informativa sulla privacy per continuare.");
      return;
    }

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      message: document.getElementById("message").value.trim(),
      gdprConsent: isUserLoggedIn() ? true : gdprCheckbox.checked,
    };

    console.log("[GDPR] Form data:", formData);
    alert("Grazie per il tuo messaggio! Ti contatteremo presto.\n(Implementazione backend da aggiungere)");

    contactForm.reset();
    updateSubmitButtonState();
  });

  window.addEventListener("storage", function (e) {
    if (e.key === "isLoggedIn") {
      console.log("[GDPR] Cambio stato login rilevato");
      initializeFormState();
    }
  });

  // === INIZIALIZZAZIONE ===
  console.log("[GDPR] Eseguendo inizializzazione form contatti");
  initializeFormState();
  console.log("[GDPR] gdprSection.style.display:", gdprSection.style.display);
  console.log("[GDPR] Inizializzazione completata");
});
