<?php

// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

// Load environment variables
require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Function to connect to the database
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


// Check if the contact id parameter is provided
if (!empty($_GET['contactId'])) {
    $id = intval($_GET['contactId']);

    $conn = getConnection();

    // Prepare SQL query to delete contact by id
    $query = "DELETE FROM Contact WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id);

    // Execute the query
    if ($stmt->execute()) {
        if ($stmt->rowCount() > 0) {
            http_response_code(200);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No contact found with the provided id"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Unable to execute query"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "contactId parameter is missing"]);
}
?>
