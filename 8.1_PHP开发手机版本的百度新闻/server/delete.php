<?php
require_once("config.php");
$newsid = $_POST['newsid'];
if ($link && $newsid) {
	$sql = "DELETE FROM news WHERE id = {$newsid}";
	mysqli_query($link,"SET NAMES utf8");
	mysqli_query($link,$sql);
	echo json_encode(array("delmsg"=>"from server:删除成功!"));
}
mysqli_close($link);
?>