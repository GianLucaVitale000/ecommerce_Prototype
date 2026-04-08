<?php session_start(); ?>
<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>Checkout</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Checkout - inserisci i dati per la spedizione">
    <meta name="robots" content="noindex, nofollow">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/hamburger.css">
    <link rel="stylesheet" href="../css/side.css">
    <link rel="stylesheet" href="../css/toggle.css">
    <link rel="stylesheet" href="../css/checkout.css">
    <!-- FAVICON -->
    <link rel="icon" type="image/png" sizes="96x96" href="../img/favicon/favicon-96x96.png">
    <link rel="shortcut icon" href="../img/favicon/favicon.ico">
    <link rel="icon" sizes="192x192" href="../img/favicon/web-app-manifest-192x192.png">
    <link rel="apple-touch-icon" href="../img/favicon/apple-touch-icon.png">
    <!-- Material Symbols -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body>
    <!-- HAMBURGER MENU -->
    <button class="hamburger" aria-label="Apri menu di navigazione" title="Apri il menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <!-- MENU LATERALE -->
    <aside class="side-menu" id="sideMenu">
        <div class="side-header-flex">
            <a href="../index.php" aria-label="Home">
                <img id="logo-img" src="../img/logoipsum-365.png" alt="Logo" class="side-logo-img" />
            </a>
            <div class="side-toggle-theme">
                <input type="checkbox" id="toggleTheme" class="theme-checkbox" />
                <label for="toggleTheme" class="toggle-switch">
                    <span class="slider">
                        <span class="thumb"></span>
                        <span class="material-symbols-outlined icon icon-dark">dark_mode</span>
                        <span class="material-symbols-outlined icon icon-light">light_mode</span>
                    </span>
                </label>
            </div>
        </div>
        <nav class="side-nav">
            <ul>
                <li><a href="../html/about.html">Chi siamo</a></li>
                <li><a href="../html/services.html">Servizi</a></li>
                <li><a href="../html/contacts.html">Contatti</a></li>
                <li><a href="#" class="cart-icon-aside cart-disabled" title="Effettua il login">
                        <span class="material-symbols-outlined">shopping_cart</span>
                        <span class="cart-badge">0</span></a>
                </li>
            </ul>
        </nav>
        <div class="side-actions">
            <div class="user-avatar-wrapper">
                <div class="user-avatar" id="userAvatar"></div>
            </div>
            <button class="btn-login" id="loginBtn">Login</button>
            <div class="register-link-wrapper">
                <span class="register-text">Non hai un account?</span>
                <a href="#" class="register-link">Registrati</a>
            </div>
            <div class="logout-icon-wrapper">
                <span class="material-symbols-outlined logout-icon" id="logoutIcon" title="Logout">logout</span>
            </div>
        </div>
    </aside>

    <main>
        <div class="container">
            <h1>Checkout</h1>
            <form method="post">
                <div class="form-group">
                    <label>Nome</label>
                    <input type="text" id="nome-utente" name="nome" value="" required>
                    <small style="color:#666;display:block;margin-top:2px;">Campo modificabile per la spedizione a soggetto terzo</small>
                </div>
                <div class="form-group">
                    <label>Cognome</label>
                    <input type="text" id="cognome-utente" name="cognome" value="" required>
                    <small style="color:#666;display:block;margin-top:2px;">Campo modificabile per la spedizione a soggetto terzo</small>
                </div>
                <div class="form-group">
                    <label>Via di consegna</label>
                    <input type="text" name="via" value="" required>
                </div>
                <div class="form-group">
                    <label>Numero di telefono</label>
                    <input type="text" name="numero" value="" required>
                </div>
                <input type="submit" name="submit" value="Invia Ordine">
            </form>
            <a href="../index.php" class="back-home">&larr; Torna alla home</a>
        </div>
        <script>
            // Precompila i campi nome e cognome con i valori da localStorage.userData, se presenti
            document.addEventListener('DOMContentLoaded', function() {
                var raw = localStorage.getItem('userData');
                if (raw) {
                    try {
                        var userData = JSON.parse(raw);
                        if (userData && userData.name) {
                            if (userData.name.first) {
                                document.getElementById('nome-utente').value = userData.name.first;
                            }
                            if (userData.name.last) {
                                document.getElementById('cognome-utente').value = userData.name.last;
                            }
                        }
                    } catch (e) {}
                }
            });
        </script>
    </main>
    </main>
    <script src="../scripts/menu.js"></script>
    <script src="../scripts/cart.js"></script>
</body>
<?php
if (isset($_POST["submit"])) {
    unset($_SESSION["carrello"]);
    $nome = isset($_POST['nome']) ? htmlspecialchars($_POST['nome']) : '';
    $cognome = isset($_POST['cognome']) ? ' ' . htmlspecialchars($_POST['cognome']) : '';
    echo '<div class="success-message"><p>Grazie per aver ordinato, ' . trim($nome . $cognome) . '!</p></div>';
    echo '<script>window.PHP_CART_COUNT = 0; if (typeof updateCartBadge === "function") updateCartBadge();</script>';
}

?>