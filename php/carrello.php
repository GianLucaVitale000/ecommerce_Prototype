<?php
session_start(); // Avvia la sessione per memorizzare il carrello
include 'data.php'; // Carica i prodotti dal file data.php

// Inizializza il carrello, se non esiste, con un array vuoto
if (!isset($_SESSION['carrello'])) {
    $_SESSION['carrello'] = [];
}

// Gestione delle azioni del carrello
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['svuota'])) { // Se viene cliccato il pulsante "Svuota carrello", resetta il carrello a un array vuoto
        $_SESSION['carrello'] = [];
    } elseif (isset($_POST['id'])) { // Se viene inviato un id di prodotto, aggiungilo al carrello
        $id = (int) $_POST['id'];
        // Cerca il prodotto nell'array $prodotti
        $prodottoTrovato = null;
        foreach ($prodotti as $p) {
            if ($p['id'] === $id) { // Se trovi il prodotto con l'id corrispondente, salvalo in $prodottoTrovato
                $prodottoTrovato = $p;
                break; // Esci dal ciclo una volta trovato il prodotto
            }
        }
        if ($prodottoTrovato) {
            // Cerca se il prodotto è già presente nel carrello
            $trovato = false;
            for ($i = 0; $i < count($_SESSION['carrello']); $i++) {
                if ($_SESSION['carrello'][$i]['id'] === $id) {
                    $_SESSION['carrello'][$i]['quantita']++;
                    $trovato = true; // Se il prodotto è già nel carrello, incrementa la quantità
                    break;
                }
            }
            if (!$trovato) { // Se il prodotto non è già nel carrello, aggiungilo come nuovo elemento con quantità 1
                $_SESSION['carrello'][] = [
                    'id' => $prodottoTrovato['id'],
                    'nome' => $prodottoTrovato['nome'],
                    'prezzo' => $prodottoTrovato['prezzo'],
                    'quantita' => 1
                ];
            }
        }
    }
    // Redirect per evitare la POST resubmission al refresh
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}
?>
<!DOCTYPE html>
<html lang="it">
<meta charset="UTF-8">
<title>Carrello</title>
<meta name="description" content="Profilo utente - Visualizza e modifica le informazioni del tuo account">
<meta name="robots" content="Profilo utente, Informazioni account">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="../css/style.css" rel="stylesheet">
<link href="../css/cart.css" rel="stylesheet">
<link href="../css/filter.css" rel="stylesheet">
<!-- FAVICON -->
<link rel="icon" type="image/png" sizes="96x96" href="../img/favicon/favicon-96x96.png">
<link rel="shortcut icon" href="../img/favicon/favicon.ico">
<link rel="icon" sizes="192x192" href="../img/favicon/web-app-manifest-192x192.png">
<link rel="apple-touch-icon" href="../img/favicon/apple-touch-icon.png">
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet">
<!-- Material Symbols -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>


<body>
    <!-- Pulsante FILTRO mobile -->
    <button id="mobileFilterBtn" class="mobile-filter-btn" type="button" style="display:none;position:fixed;top:12px;right:12px;left:auto;z-index:1001;padding:7px 14px;font-size:1em;border-radius:6px;border:none;background:#1abc9c;color:#fff;align-items:center;gap:4px;">
        <span class="material-symbols-outlined" style="font-size:1.2em;vertical-align:middle;">filter_list</span>
        <span style="font-size:0.98em;">Filtro</span>
    </button>
    <!-- Sidebar FILTRO categoria (mostrata come overlay su mobile) -->
    <aside class="filter-sidebar" id="filterSidebar" style="position:absolute; top:50vh; left:40px; transform:translateY(-50%);">
        <button type="button" id="closeFilterAsideBtn" class="close-filter-btn" aria-label="Chiudi filtro" style="display:none;position:absolute;top:10px;right:10px;background:transparent;border:none;font-size:2em;color:#888;cursor:pointer;z-index:1100;">&times;</button>
        <form method="get" id="filtroForm">
            <label for="categoria" style="display:flex;align-items:center;gap:6px;">
                <span class="material-symbols-outlined" style="font-size:1.2em;vertical-align:middle;">filter_list</span>
                Filtra per categoria:
            </label>
            <select name="categoria" id="categoria" onchange="document.getElementById('filtroForm').submit()">
                <option value="tutti" <?php if (!isset($_GET['categoria']) || $_GET['categoria'] === 'tutti') echo 'selected'; ?>>Tutti</option>
                <option value="tipo 1" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 1') echo 'selected'; ?>>Tipo 1</option>
                <option value="tipo 2" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 2') echo 'selected'; ?>>Tipo 2</option>
                <option value="tipo 3" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 3') echo 'selected'; ?>>Tipo 3</option>
                <option value="tipo 4" <?php if (isset($_GET['categoria']) && $_GET['categoria'] === 'tipo 4') echo 'selected'; ?>>Tipo 4</option>
            </select>
        </form>
    </aside>

    <script src="../scripts/cart.js"></script>
    <script src="../scripts/filterOverlay.js"></script>

    <?php
    // Esporta il carrello PHP come array JS per sincronizzare localStorage
    $cartArray = isset($_SESSION['carrello']) ? $_SESSION['carrello'] : [];
    ?>
    <script>
        window.PHP_CART_ARRAY = <?php echo json_encode($cartArray); ?>;
        // Sincronizza localStorage.cart con il carrello PHP
        try {
            localStorage.setItem('cart', JSON.stringify(window.PHP_CART_ARRAY));
        } catch (e) {}
    </script>

    <!-- MARKUP DELLA PAGINA -->
    <div class="container">
        <h1>Carrello</h1>
        <div class="main-layout">
            <!-- ELENCO PRODOTTI (a sinistra) -->
            <div class="left-column">
                <h2>Prodotti</h2>
                <div class="products">
                    <?php
                    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'tutti';
                    foreach ($prodotti as $p) {
                        if ($categoria !== 'tutti' && (!isset($p[$categoria]) || !$p[$categoria])) {
                            continue;
                        }
                    ?>
                        <div class="product"> <!-- CARD PER IL PRODOTTO -->
                            <div class="product-img">
                                <img src="<?php echo htmlspecialchars($p['img']); ?>" alt="<?php echo htmlspecialchars($p['nome']); ?>">
                            </div>
                            <div class="product-name"><?php echo htmlspecialchars($p['nome']); ?></div>
                            <div class="product-price">€ <?php echo number_format($p['prezzo'], 2, ',', '.'); ?></div>
                            <form method="post">
                                <input type="hidden" name="id" value="<?php echo $p['id']; ?>">
                                <button class="btn" type="submit">Aggiungi</button>
                            </form>
                        </div>
                    <?php } ?>
                </div>

            </div>
            <!-- CARRELLO (a destra) -->
            <div class="right-column">
                <h2>Il tuo Carrello</h2>
                <?php if (empty($_SESSION['carrello'])) { ?>
                    <div class="empty">Il carrello è vuoto.</div>
                <?php } else {
                    // Calcolo subtotale
                    $subtotale = 0;
                    foreach ($_SESSION['carrello'] as $item) {
                        $subtotale += $item['prezzo'] * $item['quantita'];
                    }
                    // Calcolo sconto
                    $sconto = 0;
                    if ($subtotale > 50) {
                        $sconto = $subtotale * 0.10;
                    }
                    $totale = $subtotale - $sconto;
                ?>
                    <!-- TABELLA DEL CARRELLO -->
                    <div class="cart-table-wrapper">
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <th>Prodotto</th>
                                    <th>Quantità</th>
                                    <th>Prezzo unitario</th>
                                    <th>Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($_SESSION['carrello'] as $item) { ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($item['nome']); ?></td>
                                        <td><?php echo $item['quantita']; ?></td>
                                        <td>€ <?php echo number_format($item['prezzo'], 2, ',', '.'); ?></td>
                                        <td>€ <?php echo number_format($item['prezzo'] * $item['quantita'], 2, ',', '.'); ?></td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                    <!-- RIEPILOGO DEL CARRELLO -->
                    <div class="cart-summary">
                        <div class="summary-row"><span>Subtotale:</span> <span>€ <?php echo number_format($subtotale, 2, ',', '.'); ?></span></div>
                        <div class="summary-row"><span>Sconto:</span> <span>- € <?php echo number_format($sconto, 2, ',', '.'); ?></span></div>
                        <div class="summary-row total"><span>Totale:</span> <span>€ <?php echo number_format($totale, 2, ',', '.'); ?></span></div>
                    </div>
                    <form method="post" style="display:inline-block; margin-right:10px;">
                        <button type="submit" name="svuota">Svuota carrello</button>
                    </form>
                    <a href="checkout.php" class="checkout-btn">Vai al checkout!</a>
                <?php } ?>
            </div>
        </div>
        <a href="../index.php" class="back-home-btn">&larr; Torna alla Home</a>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            &copy; 2026 Tutti i diritti riservati. |
            <a href="#" class="footer-link">Cookie Policy</a> |
            <a href="#" class="footer-link">Privacy Policy</a>
        </div>
    </footer>

    <script src="../scripts/cart.js"></script>
    <script src="../scripts/filterOverlay.js"></script>
</body>

</html>