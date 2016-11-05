<?php
$servername = "ecbiz204.inmotionhosting.com";
$username = "booxch5_SAP";
$password = "red123";
$database = "booxch5_NW";

// Create connection_aborted(oid)	
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>