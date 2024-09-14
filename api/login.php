<?php
// Load environment variables
require_once 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
// Set headers for JSON response
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");


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

// Get the posted JSON data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    // Sanitize inputs
    $username = htmlspecialchars(strip_tags($data->username));
    $password = htmlspecialchars(strip_tags($data->password));

    // Prepare database connection
    $conn = getConnection();

    // Prepare SQL statement to fetch user
    $query = "SELECT id, username, password FROM User WHERE username = :username LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":username", $username);

    // Execute the query
    if ($stmt->execute()) {
        // Check if a user with the given username exists
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verify the password
	    if (password_verify($password, $user['password'])) {

		// temporarily do not use TOKEN/JWT    
		// Create a token (JWT is often used, but this is a simple example)
                // $token = bin2hex(random_bytes(16)); // Generate a random token
		$secretKey = $_ENV['JWT_SECRET'];
                $payload = [
                    'iss' => 'your-website.com',
                    'iat' => time(),
                    'exp' => time() + (60 * 60),  // Token valid for 1 hour
                    'sub' => $user['id']
                ];
                $jwt = \Firebase\JWT\JWT::encode($payload, $secretKey, 'HS256');	
                // Respond with success
                http_response_code(200);
                echo json_encode([
                    "message" => "Login successful",
                    "uid" => $user['id'],
                    "token" => $jwt
                ]);
            } else {
                // Invalid password
                http_response_code(401);
                echo json_encode(["message" => "Invalid username or password!"]);
            }
        } else {
            // User not found
            http_response_code(401);
            echo json_encode(["message" => "Invalid username or password"]);
        }
    } else {
        // Query execution failed
        http_response_code(500);
        echo json_encode(["message" => "Unable to execute query"]);
    }
} else {
    // Data is missing
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data. Username and password required."]);
}
?>

