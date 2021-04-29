<?php
require_once('common.php');

check_logged_in();

$headers = getRequestHeaders();
if (!array_key_exists('X-Xsrf-Token', $headers)) {
    die_unauthorized();
}

$csrf_token = $headers['X-Xsrf-Token'];
// echo "'".$_SESSION['csrf_token']."' vs '".$csrf_token."'";
// echo $csrf_token === $_SESSION['csrf_token'];
if ($csrf_token !== $_SESSION['csrf_token']) {
    die_unauthorized();
}


if (!array_key_exists('recipient', $_POST) || !array_key_exists('amount', $_POST)) {
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo json_encode(array(
        "error" => "recipient and amount must be specified",
    ));
    die();
}

$recipient = $_POST['recipient'];
$amount = $_POST['amount'];

if ($amount > $_SESSION['balance']) {
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo json_encode(array(
        "error" => "not enough funds",
    ));

    die();
}

$_SESSION['balance'] -= $amount;

$transaction = array(
    "id"        => count($_SESSION['transactions'])+1,
    "recipient" => $recipient,
    "amount"    => $amount,
);

$_SESSION['transactions'][] = $transaction;

echo json_encode($transaction);

?>
