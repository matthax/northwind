<?php
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
    $stmt = $conn->prepare("INSERT INTO `teams`(`team_name`) VALUES (?)");
    $stmt->bind_param("s", $team_name);
    
    $team_name = $conn->real_escape_string($_POST["name"]);
}*/
if (!empty($_GET["ProductID"])) {
    if (is_int($_GET["ProductID"])) {
        $stmnt = $conn->prepare("SELECT `id`, `product_code`, `supplier_ids`, `product_name`, `description`, `standard_cost`, `list_price`, `reorder_level`, `target_level`, `quantity_per_unit`, `discontinued`, `minimum_reorder_quantity`, `category`, `attachments` FROM `products` WHERE `id` = ?");
        // bind our id parameter
        $stmnt->bind_param("i", $id);
        // set the id parameter
        $id = $_GET["ProductID"];
        // execute the statement
        $result = $stmnt->execute();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        } else {
            $err = array("error" => "Item does not exist", code => 0);
            echo json_encode($err);
        }
    }
    else {
        $err = array("error" => "Invalid Product ID", code => 1);
        echo json_encode($err);
    }
}
else {
    // create our prepared statement
    $stmnt = $conn->prepare("SELECT * FROM `products` ORDER BY ID DESC LIMIT ? OFFSET ?");
    // bind the two params as integers
    $stmnt->bind_param("ii", $pagelength, $offset);
    
    // default page length is 10
    $pagelength = 10;
    // default start point is 0
    $start = 0;
    // if we have a value for length and it's a number
    if (!empty($_GET["length"]) && is_int($_GET["length"])) {
        $pagelength = $_GET["length"];
    }
    if (!empty($_GET["page"]) && is_int($_GET["page"])) {
        $start = $_GET["page"];
    }
    $offset = $start * $pagelength;
    
    $result = $stmnt->execute();
    
    if ($result->num_rows > 0) {
        // output data of each row
        $rows = [];
        while($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
    } else {
        $err = array("error" => "No more products", code => 2);
        echo json_encode($err);
    }
}
$conn->close();
?>