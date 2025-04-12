<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Respond to OPTIONS requests with a 200 OK status
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
require 'vendor/autoload.php';
use Firebase\JWT\JWT;

// Retrieve form data
$login = $_POST['login'];
$password = $_POST['mdp'];

session_start();
$db = new PDO('mysql:host=localhost;dbname=expo_frida;port=3306','root','');
$requete =" SELECT * FROM user WHERE login=:login";
$stmt=$db->prepare($requete);
$stmt->bindValue(':login', $login, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() == 1){
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if (password_verify($password, $result["mdp"])){
        $_SESSION["login"] = $result["login"];

        // Set expiration time
        $expiration_time = time() + (60 * 60); // 1 hour

        // Token payload including expiration time and user ID
        $token_payload = [
            'login' => $login,
            'exp' => $expiration_time
        ];

        // Generate JWT token
        $token = JWT::encode($token_payload, 'mlpkfz8bal', 'HS256');

        // Return token as JSON response
        echo json_encode(["success" => true, "token" => $token]);
        // header('Location: api/reservations.php');
        exit();
    } else {
        echo json_encode(["success" => false, "error" => "Incorrect password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Invalid username"]);
}
?>
