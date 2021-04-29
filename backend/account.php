<?php
require_once('common.php');

check_logged_in();

echo json_encode(array(
    "balance" => $_SESSION["balance"],
    "transactions" => $_SESSION["transactions"],
));
exit();

?>
