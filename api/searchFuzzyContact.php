<?php
require __DIR__ . '/vendor/autoload.php'; // Load Composer's autoloader

// Load environment variables from .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Fetch database credentials from environment variables
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

header('Content-Type: application/json');

try {
    // Establish database connection using credentials from .env
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}

// Read the incoming JSON payload
$data = json_decode(file_get_contents("php://input"), true);

// Check if 'uid' is provided
if (!isset($data['uid']) || empty($data['uid'])) {
    echo json_encode(["error" => "UID is required"]);
    exit();
}

// Initialize query with mandatory 'uid' condition
$query = "SELECT * FROM Contact WHERE uid = :uid";
$params = ['uid' => $data['uid']];

// Add conditions based on non-null, non-empty input
if (!empty($data['firstName'])) {
    $query .= " AND firstName LIKE :firstName";
    $params['firstName'] = '%' . $data['firstName'] . '%';
}

if (!empty($data['lastName'])) {
    $query .= " AND lastName LIKE :lastName";
    $params['lastName'] = '%' . $data['lastName'] . '%';
}

if (!empty($data['email'])) {
    $query .= " AND email LIKE :email";
    $params['email'] = '%' . $data['email'] . '%';
}

if (!empty($data['phoneNumber'])) {
    $query .= " AND phoneNumber LIKE :phoneNumber";
    $params['phoneNumber'] = '%' . $data['phoneNumber'] . '%'; // Fuzzy search for phone numbers
}

try {
    // Prepare and execute the query
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);

    // Fetch all matching rows
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode($result);
    } else {
        echo json_encode(["message" => "No matching records found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Query failed: " . $e->getMessage()]);
}
?>

