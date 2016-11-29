<?php
header('Content-Type: application/json');
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "booxch5_NW";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {        
        $required_fields = array("company", "last_name", "first_name", "email_address", "job_title", "home_phone", "address", "city", "state_province", "zip_postal_code", "country_region");
        $result = array();
        foreach ($required_fields as $field) {
            if (empty($_POST[$field])) {
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
        else {
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
            
            $company = $conn->real_escape_string($_POST["company"]);
            $last_name = $conn->real_escape_string($_POST["last_name"]);
            $first_name = $conn->real_escape_string($_POST["first_name"]);
            $email_address = $conn->real_escape_string($_POST["email_address"]);
            $job_title = $conn->real_escape_string($_POST["job_title"]);
            $home_phone = $conn->real_escape_string($_POST["home_phone"]);
            $address = $conn->real_escape_string($_POST["address"]);
            $city = $conn->real_escape_string($_POST["city"]);
            $state_province = $conn->real_escape_string($_POST["state_province"]);
            $zip_postal_code = $conn->real_escape_string($_POST["zip_postal_code"]);
            $country_region = $conn->real_escape_string($_POST["country_region"]);

            $stmt->execute();
            $result = array("success" => true, "user_id" =>$stmt->insert_id);
            echo json_encode($result);

            $stmt->close();
            $conn->close();
        }
    }
?>