<?
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

// prepare and bind
$stmt = $conn->prepare("INSERT INTO customers (company, last_name, first_name, email_address, job_title, home_phone, address, city, state_province, zip_postal_code, country_region) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssssss", $company, $last_name, $first_name, $email_address, $job_title, $home_phone, $address, $city, $state_province, $zip_postal_code, $country_region);

// set parameters and execute
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $company = $_POST["company"];
    $last_name = $_POST["last_name"];
    $first_name = $_POST["first_name"];
    $email_address = $_POST["email_address"];
    $job_title = $_POST["job_title"];
    $home_phone = $_POST["home_phone"];
    $address = $_POST["address"];
    $city = $_POST["city"];
    $state_province = $_POST["state_province"];
    $zip_postal_code = $_POST["zip_postal_code"];
    $country_region = $_POST["country_region"];

    $stmt->execute();
}

echo "New records created successfully";

$stmt->close();
$conn->close();
?>