<?php

$obj = $_POST["obj"];
$usu = $_POST["user"];

$fp = fopen("json/".$usu.'.json', 'w');
fputs($fp, $obj);
fclose($fp);

?>