<?php
session_start();
include "data.php";


// Definizione sicura di $isLogged
$isLogged = isset($_SESSION['user']);

/* L’utente clicca su “Login” → parte la funzione fakeLogin() in menu.js.
fakeLogin() prende i dati da randomuser.me e li salva in localStorage (così il frontend sa che l’utente è loggato).
Subito dopo, fakeLogin() invia questi dati anche a set_session.php tramite fetch (AJAX POST).
set_session.php riceve i dati, avvia la sessione PHP e li salva in $_SESSION['user'] (così anche il backend sa che l’utente è loggato).
Ora, quando visiti una pagina PHP (come dettaglio.php), questa può controllare $_SESSION['user'] per sapere se l’utente è loggato e mostrare il pulsante giusto.
In sintesi:

localStorage → serve al frontend (JS) per sapere se l’utente è loggato.
$_SESSION → serve al backend (PHP) per sapere se l’utente è loggato.
La fetch a set_session.php sincronizza lo stato tra frontend e backend.
 */

// Validazione dell'id
$id = isset($_GET['id']) ? $_GET['id'] : null;
if ($id === null || !isset($prodotti[$id])) {
    echo '<div style="padding:2em;text-align:center;">Prodotto non trovato.<br><a href="../html/index.php">Torna al negozio</a></div>';
    include 'footer.php';
    exit;
} // Se l'id è valido, recupera i dettagli del prodotto dall'array $prodotti presente in data.php
$prodotto = $prodotti[$id];
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>Dettaglio Prodotto</title>
    <meta name="description" content="Dettaglio prodotto - Visualizza le informazioni del prodotto">
    <meta name="robots" content="Dettaglio prodotto, Informazioni prodotto">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../css/style.css" rel="stylesheet">
    <link href="../css/dettaglio.css" rel="stylesheet">
    <link href="../css/side.css" rel="stylesheet">
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

<body class="profile-page">

    <!-- MENU LATERALE -->
    <aside class="side-menu" id="sideMenu">
        <!-- C - Azioni laterali -->
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
        </div>
        </nav>
    </aside>

    <main class="main-section">
        <div class="dettaglio-container"><!-- CARD PER I DETTAGLI DEL PRODOTTO -->
            <h1><?php echo htmlspecialchars($prodotto['nome']); ?></h1>
            <div class="dettaglio-content">
                <div class="dettaglio-image"><!--sezione immagine (img) -->
                    <img src="<?php echo htmlspecialchars($prodotto['img']); ?>" alt="<?php echo htmlspecialchars($prodotto['nome']); ?>">
                </div>
                <div class="dettaglio-info"><!--sezione informazioni prodotto (descrizione) -->
                    <p><?php echo htmlspecialchars($prodotto['descrizione']); ?></p>
                    <!-- Prezzo del prodotto (prezzo) -->
                    <p class="dettaglio-price">€ <?php echo number_format($prodotto['prezzo'], 2, ',', '.'); ?></p>

                    <!-- Azioni disponibili per il prodotto (se l'utente è loggato) -->
                    <div class="dettaglio-actions">
                        <?php if ($isLogged): ?><!-- Verifica se l'utente è loggato -->
                            <form action="carrello.php" method="post"><!-- Form per aggiungere al carrello -->
                                <input type="hidden" name="id" value="<?php echo $id; ?>">
                                <button type="submit">Aggiungi al carrello</button>
                            </form>
                        <?php else: ?><!-- Se l'utente non è loggato, mostra il pulsante di login (al click si apre l'aside per il login) -->
                            <a href="#" id="accediBtn" class="login-button">Accedi per acquistare</a>
                        <?php endif; ?>

                    </div>
                    <a class="back-home-btn" href="../index.php">&larr; Torna alla Home</a>
                </div>
            </div>
        </div>
    </main>
</body>
<script src="../scripts/menu.js"></script>

<script>
    // Applica la preferenza tema dark da localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
</script>