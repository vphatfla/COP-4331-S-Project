<?php
// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Function to connect to the MariaDB database
function getConnection() {
    $host = "localhost";
    $db_name = "contact_manager_db";  // Replace with your MariaDB database name
    $username = "TeamOne";        // Replace with your database username
    $password = "TeamOnePassword";            // Replace with your database password

    try {
        // PDO connection string for MariaDB
        $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $exception) {
        // Send error message if connection fails
        http_response_code(500);
        echo json_encode(["message" => "Database connection error: " . $exception->getMessage()]);
        exit();
    }
}

// Function to hash the password
function hashPassword($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

// Function to check if the username already exists
function isUsernameTaken($conn, $username) {
    $query = "SELECT id FROM User WHERE username = :username LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":username", $username);
    $stmt->execute();

    return $stmt->rowCount() > 0; // Returns true if a row is found (duplicate username)
}

// Get the posted JSON data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    // Sanitize inputs
    $username = htmlspecialchars(strip_tags($data->username));
    $password = htmlspecialchars(strip_tags($data->password));

    // Get the database connection
    $conn = getConnection();

    // Check if the username already exists
    if (isUsernameTaken($conn, $username)) {
        http_response_code(400); // Bad Request
        echo json_encode(["message" => "Username already exists."]);
    } else {
        // Hash the password
        $hashedPassword = hashPassword($password);

        // Prepare SQL statement to insert a new user
        $query = "INSERT INTO User (username, password) VALUES (:username, :password)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $hashedPassword);

        // Execute the query
        if ($stmt->execute()) {
            http_response_code(201); // Created
            echo json_encode(["message" => "User registered successfully."]);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(["message" => "Unable to register user."]);
        }
    }
} else {
    // Data is missing
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Incomplete data. Username and password are required."]);
}
?>

