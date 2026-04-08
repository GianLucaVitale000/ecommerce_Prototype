<!DOCTYPE html>
<html lang="it">

<head>
  <!-- metatag per indicare la codifica dei caratteri -->
  <meta charset="UTF-8">
  <!-- metatag per il title -->
  <title>Template base</title>
  <!-- metatag di sintassi -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- metatag per l'indicizzazione SEO -->
  <meta name="description" content="Template base">
  <meta name="robots" content="index, follow">
  <!-- metatag di importazione stili -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/hamburger.css">
  <link rel="stylesheet" href="css/cards.css">
  <link rel="stylesheet" href="css/filter.css">
  <link rel="stylesheet" href="css/hero.css">
  <link rel="stylesheet" href="css/toggle.css">
  <link rel="stylesheet" href="css/side.css">
  <link rel="stylesheet" href="css/cart.css">
  <!-- FAVICON -->
  <link rel="icon" type="image/png" href="img/logoipsum-365.png">
  <link rel="shortcut icon" href="img/logoipsum-365.png">
  <!-- Importazione font Montserrat da Google -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet">
  <!-- Importazione Material Symbols di Google -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<!-- INIZIO PAGINA WEB -->
<body>

  <!--
    GESTIONE BADGE CARRELLO:
    1. PHP calcola il numero totale di prodotti nel carrello (sessione $_SESSION['carrello']).
    2. Questo valore viene esportato come variabile JS globale (window.PHP_CART_COUNT) tramite uno script inline.
    3. In cart.js, se questa variabile è presente, il badge sulle icone carrello viene aggiornato con il valore reale del carrello PHP.
    4. In questo modo il badge è sempre sincronizzato con il backend, senza bisogno di AJAX o localStorage.
  -->
  <?php
  include 'php/data.php';
  session_start();
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

  <!-- ==================== HEADER ==================== -->
  <header class="hero-section">
    <!-- HAMBURGER MENU -->
    <button class="hamburger" aria-label="Apri menu di navigazione" title="Apri il menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- ICONA CARRELLO (HERO) -->
    <a href="#" class="cart-icon-hero cart-disabled" title="Effettua il login">
      <span class="material-symbols-outlined">shopping_cart</span>
      <span class="cart-badge">0</span>
    </a>

    <!-- MENU LATERALE -->
    <aside class="side-menu" id="sideMenu">
      <!-- A - Logo e Toggle light/dark mode -->
      <div class="side-header-flex">
        <a href="#" aria-label="Home">
          <img id="logo-img" src="img/logoipsum-365.png" alt="Logo" class="side-logo-img" />
        </a>
        <div class="side-toggle-theme">
          <input type="checkbox" id="toggleTheme" class="theme-checkbox" />
          <label for="toggleTheme" class="toggle-switch">
            <span class="slider">
              <span class="thumb"></span>
              <span class="material-symbols-outlined icon icon-dark">dark_mode</span>
              <span class="material-symbols-outlined icon icon-light">sunny</span>
            </span>
          </label>
        </div>
      </div>
      <!-- B - Navigazione -->
      <nav class="side-nav">
        <ul>
          <li><a href="html/about.html">Chi siamo</a></li>
          <li><a href="html/services.html">Servizi</a></li>
          <li><a href="html/contacts.html">Contatti</a></li>
          <li><!-- C - Filtro categoria prodotti (solo home) -->
            <form method="get" id="filtroFormAside" style="margin-top:32px;">
              <label for="categoria-aside" style="display:flex;align-items:center;gap:6px;">
                <span class="material-symbols-outlined" style="font-size:1.2em;vertical-align:middle;">filter_list</span>
                Filtra per categoria:
              </label>
              <select name="categoria" id="categoria-aside" onchange="document.getElementById('filtroFormAside').submit()">
                <option value="tutti" <?php if (!isset($_GET['categoria']) || $_GET['categoria'] === 'tutti') echo 'selected'; ?>>Tutti</option>
                <option value="tipo 1" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 1') echo 'selected'; ?>>Tipo 1</option>
                <option value="tipo 2" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 2') echo 'selected'; ?>>Tipo 2</option>
                <option value="tipo 3" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 3') echo 'selected'; ?>>Tipo 3</option>
                <option value="tipo 4" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 4') echo 'selected'; ?>>Tipo 4</option>
              </select>
            </form>
          </li>
          <!-- D - Icona carrello -->
          <li><a href="#" class="cart-icon-aside cart-disabled" title="Effettua il login">
              <span class="material-symbols-outlined">shopping_cart</span>
              <span class="cart-badge">0</span></a>
          </li>
        </ul>
      </nav>

      <!-- D - Azioni laterali -->
      <div class="side-actions">
        <!-- 1 - Avatar utente -->
        <div class="user-avatar-wrapper">
          <div class="user-avatar" id="userAvatar"></div>
        </div>
        <!-- 2 - Pulsante di login -->
        <button class="btn-login" id="loginBtn">Login</button>
        <!-- 3 - Link di registrazione -->
        <div class="register-link-wrapper">
          <span class="register-text">Non hai un account?</span>
          <a href="#" class="register-link">Registrati</a>
        </div>
        <!-- 4 - Icona di logout -->
        <div class="logout-icon-wrapper">
          <span class="material-symbols-outlined logout-icon" id="logoutIcon" title="Logout">logout</span>
        </div>
      </div>
      </nav>
    </aside>

    <!-- CAROUSEL -->
    <div class="hero-carousel">
      <div class="carousel-images">
        <img src="https://placehold.co/1200x450?text=Slide+1" alt="Slide 1" class="carousel-image active">
        <img src="https://placehold.co/1200x450?text=Slide+2" alt="Slide 2" class="carousel-image">
        <img src="https://placehold.co/1200x450?text=Slide+3" alt="Slide 3" class="carousel-image">
      </div>
      <div class="hero-content">
        <h1>Benvenuto nel nostro sito!</h1>
        <p>Scopri le nostre novità e lasciati ispirare dalle immagini del carousel.</p>
      </div>
      <button class="carousel-btn prev" aria-label="Immagine precedente">&#10094;</button>
      <button class="carousel-btn next" aria-label="Immagine successiva">&#10095;</button>
    </div>
  </header>

  <!-- ==================== MAIN CONTENT ==================== -->
  <main class="content" style="display: flex; flex-direction: row; align-items: flex-start; position:relative;">
    <!-- FILTRO CATEGORIA -->
    <!-- Contenitore card prodotti -->
    <div class="card-container">
      <!-- elenco prodotti con applicazione del filtro -->
      <?php
      $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'tutti';
      $prodotti_filtrati = [];
      if ($categoria === 'tutti') {/* tutti i prodotti */
        $prodotti_filtrati = $prodotti;
      } else {/* prodotti della categoria selezionata */
        foreach ($prodotti as $prodotto) {
          if (isset($prodotto[$categoria]) && $prodotto[$categoria]) {
            $prodotti_filtrati[] = $prodotto;
          }
        }
      }
      if (count($prodotti_filtrati) === 0) {/* nessun prodotto trovato */
        echo '<p style="margin:32px 0;">Nessun prodotto trovato per questa categoria.</p>';
      } else {/* prodotti filtrati */
        foreach ($prodotti_filtrati as $prodotto): ?>
          <div class="card">
            <img src="<?php echo $prodotto['img']; ?>" alt="<?php echo $prodotto['nome']; ?>" class="card-image">
            <div class="card-content">
              <h3 class="card-title"><?php echo $prodotto['nome']; ?></h3>
              <p class="card-text"><?php echo $prodotto['descrizione']; ?></p>
              <p class="price">&euro; <?php echo number_format($prodotto['prezzo'], 2, ',', '.'); ?></p>
              <a href="php/dettaglio.php?id=<?php echo $prodotto['id']; ?>" class="card-link">Scopri di più &gt;</a>
            </div>
          </div>
      <?php endforeach;
      }
      ?>
    </div>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="footer">
    <div class="footer-content">
      &copy; 2026 Tutti i diritti riservati. |
      <a href="#" class="footer-link">Cookie Policy</a> |
      <a href="#" class="footer-link privacy-policy-link">Privacy Policy</a>
    </div>
  </footer>
</body>
<!-- FINE PAGINA WEB -->

<script src="scripts/carousel.js"></script>
<script src="scripts/cart.js"></script>
<script src="scripts/menu.js"></script>
<script src="scripts/gdpr-compliance.js"></script>

</html>