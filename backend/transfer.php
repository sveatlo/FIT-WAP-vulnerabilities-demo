<?php
require_once('common.php');

check_logged_in();

if (!array_key_exists('recipient', $_REQUEST) || !array_key_exists('amount', $_REQUEST)) {
        header('HTTP/1.1 400 Bad Request', true, 400);
        echo json_encode(array(
            "error" => "recipient and amount must be specified",
        ));
        die();
}

$recipient = $_REQUEST['recipient'];
$amount = $_REQUEST['amount'];

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
