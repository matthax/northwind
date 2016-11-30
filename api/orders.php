<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "booxch5_NW";

header('Content-Type: application/json');

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    $err = array("error" => "Connection failed: " . $conn->connect_error, "code" => -1);
    die(json_encode($err));
}
/*if ($_SERVER['REQUEST_METHOD'] == 'POST' && 
    !empty($_POST["name"]) && 
    !empty($_POST["level"]) && 
    !empty($_POST["description"])) {
    // prepare and bind
    $stmt = $conn->prepare("INSERT INTO teams(team_name) VALUES (?)");
    $stmt->bind_param("s", $team_name);
    
    $team_name = $conn->real_escape_string($_POST["name"]);
}*/
if (!empty($_GET["CustomerID"])) {
    if (ctype_digit($_GET["CustomerID"])) {
        $stmnt = $conn->prepare("SELECT products.product_name, products.standard_cost, products.list_price, products.category, orders.order_date, details.quantity, details.unit_price FROM orders INNER JOIN (SELECT * FROM customers) AS customers on customers.id = orders.customer_id INNER JOIN (SELECT * FROM order_details) AS details on orders.id = details.order_id INNER JOIN (SELECT * FROM products) AS products on details.product_id = products.id WHERE customers.id = ?");
        // bind our id parameter
        $stmnt->bind_param("i", $id);
        // set the id parameter
        $id = intval($_GET["CustomerID"]);
        // execute the statement
        $result = $stmnt->execute();

        $stmnt -> bind_result($product_name, $standard_cost, $list_price, $category, $order_date, $quantity, $unit_price);

        $rows = [];
        while($stmnt->fetch()) {
            $row = array("product_name" => $product_name,
                    "standard_cost" => $standard_cost,
                    "list_price" => $list_price,
                    "category" => $category, 
                    "order_date" => $order_date, 
                    "quantity" => $quantity, 
                    "unit_price" => $unit_price);
            $rows[] = $row;    
        }
        echo json_encode($rows); 
        /*else {
            $err = array("error" => "Customer does not exist", "code" => 0);
            echo json_encode($err);
        }*/
    }
    else {
        $err = array("error" => "Invalid Customer ID", "code" => 1);
        echo json_encode($err);
    }
}
$conn->close();
?>