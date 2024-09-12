<?php
// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");


// Function to connect to the database
function getConnection() {
	$host = "127.0.0.1";
    $db_name = "contact_manager_db"; // Replace with your database name
    $username = "TeamOne";       // Replace with your database username
    $password = "TeamOnePassword";           // Replace with your database password

    try {
        $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode(["message" => "Database connection error: " . $exception->getMessage()]);
        die(json_encode(["message" => "Database connection error: " . $exception->getMessage()]));
    }
}

$conn = getConnection();

$query = "SELECT * FROM Contact";
$statment = $conn->prepare($query);
$statment->execute();

$contacts = $statment->fetchAll(PDO::FETCH_ASSOC);


if (count($contacts) === 0) {
    http_response_code(404); // Not Found
    echo json_encode(["message" => "No contacts found."]);
    die();
} else {
    http_response_code(200);
    echo json_encode($contacts);
}

// Get the posted JSON data
$data = json_decode(file_get_contents("php://input"));
?>

