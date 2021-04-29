<?php
require_once('common.php');

session_unset();
session_destroy();

echo json_encode(array(
    "success" => true,
))

?>
