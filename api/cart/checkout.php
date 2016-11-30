<?php 
session_start(); 

header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$database = "booxch5_NW";
$totalPrice = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {        
    $required_fields = array("product_id", "quantity");
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
        $stmt = $conn->prepare("INSERT INTO orders (employee_id, customer_id, order_date, shipped_date, shipper_id) VALUES (1, ?, NOW(), NOW() + INTERVAL 1 DAY, 3)");
        $stmt->bind_param("s", $customer_id);
        $customer_id = $_SESSION["id"];
        $stmt->execute();
        $order_id = $stmt->insert_id;

        $detail_stmt = $conn->prepare("INSERT INTO order_details (order_id, product_id, quantity, unit_price, status_id) VALUES (?, ?, ?, ?, 2)");
        $detail_stmt->bind_param("ssss", $order_id, $customer_id, $quantity, $unit_price);
        // prepare and bind
        foreach ($_POST as $id => $product) {
            $customer_id = $_SESSION["id"];
            $product_id = $product["ProductID"];
            $quantity = $product["Quantity"];
            $unit_price = $product["Price"];
            $totalPrice += $quantity * $price;
            $detail_stmt->execute();
        }
        
        $result = array("success" => true, "total" => $totalPrice, "date" => date('Y-m-d H:i:s'), "order_id" => $order_id, "shipped_date" => $shipped_date);
        echo json_encode($result);

        $stmt->close();
        $conn->close();
    }
}

?>