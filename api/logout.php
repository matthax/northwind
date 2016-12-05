<?php 

session_start();
$result = array("success" => false);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_unset();
    session_destroy();
    $host  = $_SERVER['HTTP_HOST'];
    $uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
    $tgt = '#/login';
    header("Location: http://$host$uri/$tgt");
    
    $result = array("success" => true);
    exit;
}
echo json_encode($result);

?>