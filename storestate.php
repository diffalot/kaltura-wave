<?php
$state = $_POST["state"];
$id = $_POST["id"];

$filename = "wavestate_" . $id . ".txt";
$fp = fopen($filename, "a+");
fwrite($fp, "\"" . $state . "\",\n");
fclose($fp);
?>
