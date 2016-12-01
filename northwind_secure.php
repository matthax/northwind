<?php
session_start();
    
function isLoggedIn() {
    $auth = '09F911029D74E35BD84156C5635688C0';
    if (isset($_SESSION['auth']) && strcmp($_SESSION['auth'], $auth) === 0) {
        return True;
    }
    return False;
}
if (!isLoggedIn()) {
    $result = array("error" => true, "message" => "You must be logged in to access this page", "reason" => "auth");
    die(json_encode($result));
}
?>