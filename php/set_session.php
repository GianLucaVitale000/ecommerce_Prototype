<?php
session_start();
// Ricevi i dati utente dal frontend (JSON)
$data = json_decode(file_get_contents('php://input'), true);
if ($data && isset($data['email'])) {
    $_SESSION['user'] = $data;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Dati non validi']);
}
