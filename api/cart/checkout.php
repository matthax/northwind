<?php 
include("northwind_secure.php");

header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$database = "booxch5_NW";
$totalPrice = 0;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    /*$required_fields = array("product_id", "quantity");
    $result = array();
    /oreach ($required_fields as $field) {
        if (empty($data[$field])) {
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
    else {*/
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

        $detail_stmt = $conn->prepare("INSERT INTO order_details (order_id, product_id, quantity, unit_price, status_id) VALUES (?, ?, ?, ?, 2)");
        $detail_stmt->bind_param("iiii", $order_id, $product_id, $quantity, $unit_price);
        $order_id = $stmt->insert_id;
        // prepare and bind
        foreach ($data as $id => $product) {
            /*foreach ($product as $key => $val) {
                echo $key." ".$val;
            }*/
            $product_id = intval($product["ProductID"]);
            $quantity = intval($product["Quantity"]);
            $unit_price = floatval($product["Price"]);
            $totalPrice += $quantity * $unit_price;
            $detail_stmt->execute();
        }
        $result = array("success" => true, "total" => $totalPrice, "date" => date('Y-m-d H:i:s'), "order_id" => $order_id, "shipped_date" => date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s')." + 1 day")));
        echo json_encode($result);

        $stmt->close();
        $conn->close();
    //}
}

?>