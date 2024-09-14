<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

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

function checkIfPhoneExists($uid, $phoneNumber)
{
    $conn = getConnection();

    $query = "SELECT * FROM Contact WHERE uid = :uid AND phoneNumber = :phoneNumber LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':uid', $uid);
    $stmt->bindParam(':phoneNumber', $phoneNumber);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function checkIfEmailExists($uid, $email)
{
    $conn = getConnection();

    // Query to check if email exists for the given uid
    $query = "SELECT * FROM Contact WHERE uid = :uid AND email = :email LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':uid', $uid);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

$input = json_decode(file_get_contents("php://input"), true);

if (
    !empty($input['uid']) &&
    !empty($input['phoneNumber']) &&
    !empty($input['firstName']) &&
    !empty($input['lastName']) &&
    !empty($input['email'])
) {
    $uid = intval($input['uid']);
    $phoneNumber = $input['phoneNumber'];
    $firstName = $input['firstName'];
    $lastName = $input['lastName'];
    $email = $input['email'];

    // Check if phone number exists for this user
    if (checkIfPhoneExists($uid, $phoneNumber)) {
        http_response_code(409);
        echo json_encode(["message" => "Duplicate contact: The phone number already exists for this user."]);
    }
    // Check if email exists for this user
    elseif (checkIfEmailExists($uid, $email)) {
        http_response_code(409);
        echo json_encode(["message" => "Duplicate contact: The email address already exists for this user."]);
    } else {
        $conn = getConnection();

        // SQL query to insert new contact
        $query = "INSERT INTO Contact (uid, phoneNumber, firstName, lastName, email)
                  VALUES (:uid, :phoneNumber, :firstName, :lastName, :email)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':uid', $uid);
        $stmt->bindParam(':phoneNumber', $phoneNumber);
        $stmt->bindParam(':firstName', $firstName);
        $stmt->bindParam(':lastName', $lastName);
        $stmt->bindParam(':email', $email);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "Contact added successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to add contact."]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Missing required fields: uid, phoneNumber, firstName, lastName, email"]);
}

?>