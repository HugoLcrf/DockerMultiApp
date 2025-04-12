<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Respond to OPTIONS requests with a 200 OK status
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require('model.php');
require 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'GET':
        // authenticateRequest();
        if (isset($_GET["id"])) {
            $result = getOneReservation($_GET["id"]);
        } else {
            $result = getAllReservations();
        }
        header('Content-Type: application/json');
        echo json_encode($result);
        break;

    case 'POST':

        $data = json_decode(file_get_contents('php://input'), true);
        if (!empty($data)) {
            // Appeler la fonction addReservation avec le tableau de données
            addReservation($data);
            envoiMail($data);
        
            // Répondre avec un code de succès et les données JSON
            http_response_code(201);
            header('Content-Type: application/json');
            echo json_encode([
                'message' => 'Réservation ajoutée avec succès',
            ]);
        } else {
            
            // Répondre avec un code d'erreur si les données de la requête sont vides
            http_response_code(400);
            echo json_encode(['message' => 'Les données de la requête sont vides']);
        }
        break;

    case 'DELETE':
        // authenticateRequest();

        $id = intval($_GET['id']);
        deleteReservation($id);

        // envoi de message 
        http_response_code(200);
        echo json_encode(['message' => 'Reservation supprimée avec succès']);
        break;

    default:
        http_response_code(405);
        header('Allow: GET, POST, DELETE');
        echo json_encode([
            'message' => 'method not allowed'
        ]);
}

?>