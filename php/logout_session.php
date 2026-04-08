<?php
session_start();
// Distruggi la sessione utente
unset($_SESSION['user']);
session_destroy();
echo json_encode(['success' => true]);
