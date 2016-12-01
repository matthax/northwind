
<?php
session_start(); 

$servername = "localhost";
$username = "root";
$password = "";
$database = "booxch5_NW";

$password_access = "red123";

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
    else if ($password_access !== $_POST["password"]) {
        $result = array("error" => true, "message" => "Invalid username or password");
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
        $stmt = $conn->prepare("SELECT `first_name`,`last_name` FROM `customers` where `id` = ?");
        $stmt->bind_param("i", $user_id);
        $user_id = $conn->real_escape_string(intval($_POST["user_id"]));
        $password = $conn->real_escape_string($_POST["password"]);

        $stmt->execute();
        $stmt->bind_result($first_name, $last_name);
        
        if ($stmt->fetch()) {
            $result = array("id" => $user_id, 
                            "success" => true,
                            "first_name" => $first_name,
                            "last_name" => $last_name
                            );
            echo json_encode($result);
        }
        else {
            $result = array("error" => true, "message" => "Invalid username or password");
            echo json_encode($result);
        }

        $stmt->close();
        $conn->close();
    }
}
?>