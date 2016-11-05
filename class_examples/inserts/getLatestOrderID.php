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


$sql = "SELECT max(id) as ID from `booxch5_NW`.`orders`";


$result = mysqli_query($conn, $sql);
$output="";

if (mysqli_num_rows($result) > 0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
    	$output .=   $row["ID"];
    }

} else {
    echo "0 results";
}

echo $output;

$conn->close();



?>