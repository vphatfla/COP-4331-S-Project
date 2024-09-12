<?php

// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Load environment variables
require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Function to connect to the database
function getConnection() {
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

// Check if the uid parameter is provided
if (!empty($_GET['uid'])) {
    $uid = intval($_GET['uid']);

    // Prepare database connection
    $conn = getConnection();

    // Prepare SQL query to fetch contacts based on uid
    $query = "SELECT * FROM Contact WHERE uid = :uid";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":uid", $uid);

    // Execute the query
    if ($stmt->execute()) {
        $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if any contacts were found
        if ($contacts) {
            // Respond with contacts array
            http_response_code(200);
            echo json_encode($contacts);
        } else {
            // No contacts found for the uid
            http_response_code(404);
            echo json_encode(["message" => "No contacts found for the provided uid"]);
        }
    } else {
        // Query execution failed
        http_response_code(500);
        echo json_encode(["message" => "Unable to execute query"]);
    }
} else {
    // uid parameter is missing
    http_response_code(400);
    echo json_encode(["message" => "uid parameter is missing"]);
}
?>

