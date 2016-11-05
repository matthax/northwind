<?php session_start();?>

<?php
$servername = "ecbiz204.inmotionhosting.com";
$username = "booxch5_SAP";
$password = "red123";
$database = "booxch5_NW";

$servername = "localhost";
$username = "root";
$password = "";


$company = $_GET["company"];
// Create connection_aborted(oid)	
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql = "SELECT cust.company, 
			cust.first_name, 
			cust.last_name, 
			orders.id, 
			orders.customer_id, 
			details.quantity, 
			prods.product_name, 
			prods.description, 
			prods.list_price, 
			details.unit_price,
			details.quantity * prods.list_price AS 'rev'

			FROM booxch5_NW.orders orders
			left JOIN booxch5_NW.customers cust ON cust.id = orders.customer_id
			left JOIN booxch5_NW.order_details details ON orders.id = details.order_id 
			left JOIN booxch5_NW.products prods on prods.id = details.product_id

			WHERE orders.customer_id = $company";


$result = mysqli_query($conn, $sql);
$output="";

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	$output .=   $row["company"] . "&emsp;" . 
    	$row["first_name"] . "&emsp;" .
    	$row["last_name"] . "&emsp;" .
    	$row["id"] . "&emsp;" .
    	$row["customer_id"] . "&emsp;" .
    	$row["quantity"] . "&emsp;" .
    	$row["product_name"] . "&emsp;" .
    	$row["description"] . "&emsp;" .
    	$row["list_price"] . "&emsp;" . 
    	$row["rev"] . "&emsp;" . "<br>";
    }

} else {
    echo "0 results";
}

echo $output;

$conn->close();



?>