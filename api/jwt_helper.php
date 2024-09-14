// jwt_helper.php
<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function verify_jwt($jwt) {
    $secret_key = getenv('JWT_SECRET');

    try {
        $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        return json_encode(['message' => 'Not Authorized']);
    }
}

