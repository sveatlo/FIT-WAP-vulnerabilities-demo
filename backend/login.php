<?php
require_once('common.php');

if ($_POST['username'] === "test" && $_POST['password'] === "test") {
    $_SESSION['logged_in'] = true;
    reset_account();

    $csrf = md5(rand());
    $_SESSION["csrf_token"] = $csrf;

    echo json_encode(array(
        "user" => array(
            "name" => $_SESSION["name"],
        ),
        "xsrf_token" => $csrf,
    ));
    exit();
}

    header('HTTP/1.1 401 Unauthorized', true, 401);
    echo json_encode(array(
        "error" => "invalid username and/or password"
    ));
?>
