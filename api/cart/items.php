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
    if (ctype_digit($_GET["ProductID"])) {
        $stmnt = $conn->prepare("SELECT `id`, `product_code`, `supplier_ids`, `product_name`, `description`, `standard_cost`, `list_price`, `reorder_level`, `target_level`, `quantity_per_unit`, `discontinued`, `minimum_reorder_quantity`, `category`, `attachments` FROM `products` WHERE `id` = ?");
        // bind our id parameter
        $stmnt->bind_param("i", $id);
        // set the id parameter
        $id = intval($_GET["ProductID"]);
        // execute the statement
        $result = $stmnt->execute();
        
        $stmnt->bind_result($id, $supplier_ids, $product_code, $product_name, $description, $standard_cost, $list_price, $reorder_level, $target_level, $quantity_per_unit, $discontinued, $minimum_reorder_quantity, $category, $attachments);
        
        $rows = [];
        if($stmnt->fetch()) {
            $row = array("id" => $id, 
                            "product_code" => $product_code, 
                            "supplier_ids" => $supplier_ids, 
                            "product_name" => $product_name, 
                            "description" => $description, 
                            //"standard_cost" => $standard_cost, 
                            "list_price" => $list_price, 
                            "reorder_level" => $reorder_level, 
                            "target_level" => $target_level, 
                            "quantity_per_unit" => $quantity_per_unit, 
                            "discontinued" => $discontinued, 
                            "minimum_reorder_quantity" => $minimum_reorder_quantity, 
                            "category" => $category, 
                            "attachments" => $attachments);
            echo json_encode($row);
        }
        else {
            $err = array("error" => "Item does not exist", code => 1);
            echo json_encode($err);
        }
    }
    else {
        $err = array("error" => "Invalid product ID", code => 0);
        echo json_encode($err);
    }
}
else {
    // create our prepared statement
    $stmnt = $conn->prepare("SELECT `id`, `supplier_ids`, `product_code`, `product_name`, `description`, `standard_cost`, `list_price`, `reorder_level`, `target_level`, `quantity_per_unit`, `discontinued`, `minimum_reorder_quantity`, `category`, `attachments` FROM `products` ORDER BY ID ASC LIMIT ? OFFSET ?");
    // bind the two params as integers
    $stmnt->bind_param("ii", $pagelength, $offset);
    
    // default page length is 10
    $pagelength = abs(!empty($_GET["length"]) ? intval($_GET["length"]) : 10);
    if ($pagelength <= 0) {
        $pagelength = 10;
    }
    // default start point is 0
    $start = abs(!empty($_GET["page"]) ? intval($_GET["page"]) : 0);
    // if we have a value for length and it's a number
    $offset = $start * $pagelength;
    
    $result = $stmnt->execute();
    $stmnt->bind_result($id, $supplier_ids, $product_code, $product_name, $description, $standard_cost, $list_price, $reorder_level, $target_level, $quantity_per_unit, $discontinued, $minimum_reorder_quantity, $category, $attachments);
        // output data of each row
        $rows = [];
        while($stmnt->fetch()) {
            $rows[] = array("id" => $id, 
                            "product_code" => $product_code, 
                            "supplier_ids" => $supplier_ids, 
                            "product_name" => $product_name, 
                            "description" => $description, 
                            //"standard_cost" => $standard_cost, 
                            "list_price" => $list_price, 
                            "reorder_level" => $reorder_level, 
                            "target_level" => $target_level, 
                            "quantity_per_unit" => $quantity_per_unit, 
                            "discontinued" => $discontinued, 
                            "minimum_reorder_quantity" => $minimum_reorder_quantity, 
                            "category" => $category, 
                            "attachments" => $attachments);
        }
        echo json_encode($rows);
    /*else {
        $err = array("error" => "No more products", code => 2, "sql" => $stmnt);
        echo json_encode($err);
    }*/
}
$conn->close();
?>