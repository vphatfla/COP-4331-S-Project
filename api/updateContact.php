<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

function getConnection()
{
    $host = $_ENV['DB_HOST'];  // Fetch from .env
    $db_name = $_ENV['DB_NAME']; // Fetch from .env
    $username = $_ENV['DB_USER']; // Fetch from .env
    $password = $_ENV['DB_PASS']; // Fetch from .env

    try {
        $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode(["message" => "Database connection error: " . $exception->getMessage()]);
        die();
    }
}

function checkIfPhoneExists($uid, $phoneNumber, $contactId)
{
    $conn = getConnection();
    $query = "SELECT * FROM Contact WHERE uid = :uid AND phoneNumber = :phoneNumber AND id != :contactId LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':uid', $uid);
    $stmt->bindParam(':phoneNumber', $phoneNumber);
    $stmt->bindParam(':contactId', $contactId);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function checkIfEmailExists($uid, $email, $contactId)
{
    $conn = getConnection();
    $query = "SELECT * FROM Contact WHERE uid = :uid AND email = :email AND id != :contactId LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':uid', $uid);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':contactId', $contactId);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

$input = json_decode(file_get_contents("php://input"), true);


if (
    !empty($input['id']) &&
    !empty($input['uid']) &&
    !empty($input['phoneNumber']) &&
    !empty($input['firstName']) &&
    !empty($input['lastName']) &&
    !empty($input['email'])
) {
    $contactId = intval($input['id']);
    $uid = intval($input['uid']);
    $phoneNumber = $input['phoneNumber']; 
    $firstName = $input['firstName'];      
    $lastName = $input['lastName'];        
    $email = $input['email'];              

    
        $conn = getConnection();

        $query = "UPDATE Contact SET phoneNumber = :phoneNumber, firstName = :firstName, lastName = :lastName, email = :email 
                  WHERE id = :contactId AND uid = :uid";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':phoneNumber', $phoneNumber);
        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':contactId', $contactId);
        $stmt->bindParam(':uid', $uid);

        if ($stmt->execute()) {
            if ($stmt->rowCount() > 0) {
                http_response_code(200); 
            } else {
                // No changes were made
                http_response_code(200); 
            }
        } else {
            http_response_code(500);
        }


} else {
    // Missing required fields
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields: id, uid, phoneNumber, firstName, lastName, email"]);
}

?>
