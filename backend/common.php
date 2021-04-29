<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    die();
}

session_start();
header("Content-Type: application/json");

function reset_account() {
    $_SESSION['name'] = "John Doe";
    $_SESSION['balance'] = 999994.1401;
    $_SESSION['transactions'] = array(
        array(
            "id" => 1,
            "recipient" => "Joe Doe",
            "amount" => 3.1415926535897,
        ),
        array(
            "id" => 2,
            "recipient" => "Jane Doe",
            "amount" => 2.71828,
        ),
    );
}

function is_logged_in() {
    // var_dump($_SESSION);
    return array_key_exists('logged_in', $_SESSION) && $_SESSION['logged_in'] === true;
}

function die_unauthorized() {
        header('HTTP/1.1 401 Unauthorized', true, 401);
        echo json_encode(array(
            "error" => "Unauthorized",
        ));
        die();
}

function check_logged_in() {
    if(!is_logged_in()) {
        die_unauthorized();
    }
}

function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}


?>
