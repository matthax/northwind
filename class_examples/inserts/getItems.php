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

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


$sql = "SELECT 
`supplier_ids`, 
`id`,
`product_code`,
`product_name`, 
`description`, 
`standard_cost`, 
`list_price`, 
`reorder_level`,
`target_level`, 
`quantity_per_unit`,
`discontinued`, 
`minimum_reorder_quantity`, 
`category`, 
`attachments` 
FROM `products`";


$result = mysqli_query($conn, $sql);
$output="";


$output .= "<tr>";
$output .=  "<th>id</th>";
$output .=  "<th>product_code</th>";
$output .=  "<th>product_name</th>";
$output .=  "<th>description</th>";
$output .=  "<th>standard_cost</th>";
$output .=  "<th>list_price</th>";
$output .=  "<th>reorder_level</th>";
$output .=  "<th>target_level</th>";
$output .=  "<th>quantity_per_unit</th>";
$output .=  "<th>discontinued</th>";
$output .=  "<th>minimum_reorder_quantity</th>";
$output .=  "<th>category</th>";
$output .=  "<th>attachments</th>";
$output .= "</tr>";

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	$id = $row["id"];
    	$product_code = $row["product_code"];
  		$product_name = $row["product_name"];
    	$description= $row["description"];
    	$standard_cost= $row["standard_cost"];
    	$list_price= $row["list_price"];
    	$reorder_level= $row["reorder_level"];
    	$target_level= $row["target_level"];
    	$quantity_per_unit= $row["quantity_per_unit"];
    	$discontinued= $row["discontinued"];
    	$minimum_reorder_quantity= $row["minimum_reorder_quantity"];
    	$category= $row["category"];
    	$attachments= $row["attachments"];

    	$output .="<tr id='item-$id'>";
    	$output .="<td>$id</td>";
    	$output .="<td>$product_code</td>";
    	$output .="<td>$product_name</td>";
    	$output .="<td>$description</td>";
    	$output .="<td>$standard_cost</td>";
    	$output .="<td>$list_price</td>";
    	$output .="<td>$reorder_level</td>";
    	$output .="<td>$target_level</td>";
    	$output .="<td>$quantity_per_unit</td>";
    	$output .="<td>$discontinued</td>";
    	$output .="<td>$minimum_reorder_quantity</td>";
    	$output .="<td>$category</td>";
    	$output .="<td>$attachments</td>";

    	$output .="</tr>";
    }

} else {
    echo "0 results";
}

echo $output;

$conn->close();



?>