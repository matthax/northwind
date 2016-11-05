<?php session_start();?>

<?php
$servername = "ecbiz204.inmotionhosting.com";
$username = "booxch5_SAP";
$password = "red123";
$database = "booxch5_NW";

$servername = "localhost";
$username = "root";
$password = "";


// Create connection_aborted(oid)	
$conn = new mysqli($servername, $username, $password, $database);

$orderID = $_GET["orderID"];
$compID = $_GET["compID"];
$addID = $_GET["addID"];
$cityID = $_GET["cityID"];
$stateID = $_GET["stateID"];
$zipID = $_GET["zipID"];

$productID = $_GET["productID"];
$qtyID = $_GET["qtyID"];
$price = $_GET["price"];


// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql = 
"INSERT INTO `booxch5_NW`.`orders` (
					`id` ,
					`employee_id` ,
					`customer_id` ,
					`order_date` ,
					`shipped_date` ,
					`shipper_id` ,
					`ship_name` ,
					`ship_address` ,
					`ship_city` ,
					`ship_state_province` ,
					`ship_zip_postal_code` ,
					`ship_country_region` ,
					`shipping_fee` ,
					`taxes` ,
					`payment_type` ,
					`paid_date` ,
					`notes` ,
					`tax_rate` ,
					`tax_status_id` ,
					`status_id`
					)
					VALUES 
					(null , 1 , '$compID' , now(), now()+7 , 2 , 'Anna Bedecs' , '$addID' , '$cityID' , '$stateID' , '$zipID', 'Mario Land' ,  0.0000,  0.0000, 'Visa' , now()+6 , NULL ,  0, NULL ,  0 );";


$sqlDetails = 
"INSERT INTO  `booxch5_NW`.`order_details` (
`id` ,
`order_id` ,
`product_id` ,
`quantity` ,
`unit_price` ,
`discount` ,
`status_id` ,
`date_allocated` ,
`purchase_order_id` ,
`inventory_id`
)
VALUES (
NULL ,  '$orderID', $productID ,  '$qtyID',  '$price',  '0', NULL , NULL , NULL , NULL
);";


if ($conn->query($sql) === TRUE && $conn->query($sqlDetails) === TRUE) {
    echo "1";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



?>