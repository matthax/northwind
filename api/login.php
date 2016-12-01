
<?php
session_start(); 

$servername = "localhost";
$username = "root";
$password = "";
$database = "booxch5_NW";

$password_access = "red123";
$user_id_success = false;
$password_success = false;
$login_success = false;

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {        
    $required_fields = array("user_id", "password");
    $result = array();
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            $result["error"] = true;
            if (!isset($result["missing_fields"])) {
                $result["missing_fields"] = array();
            }
            $result["missing_fields"][] = $field;
        }
    }
    if (isset($result["error"])) {
        die(json_encode($result)); 
    }
    else {
        // Create connection
        $conn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if ($conn->connect_error) {
            $err = array("error" => "Connection failed: " . $conn->connect_error, "code" => -1);
            die(json_encode($err));
        }

        // prepare and bind
        $stmt = $conn->prepare("SELECT first_name FROM customers WHERE id = ?");
        $stmt->bind_param("s", $user_id);
        
        $user_id = $conn->real_escape_string($_POST["user_id"]);
        $password = $conn->real_escape_string($_POST["password"]);

        $stmt->execute();
        $stmt->bind_result($first_name);

        if ($password === $password_access) {
            $password_success = true;
        }
        if (!empty($first_name)) {
            $user_id_success = true;
        }
        if ($password_success && $user_id_success) {
            $login_success = true;
        }

        $result = array("user_id_success" => $user_id_success, "password_success" => $password_success, "login_success" => $login_success, "first_name" => $first_name, "user_id" => $user_id);
        $_SESSION["user_name"] = $first_name;
        $_SESSION["id"] = $user_id;
        echo json_encode($result);

        $stmt->close();
        $conn->close();
    }
}
?>