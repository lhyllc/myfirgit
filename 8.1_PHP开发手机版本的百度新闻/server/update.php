<?php
require_once("config.php");

if($link){
	//获得POST发来的数据
	$newstitle = $_POST['newstitle'];
	$newstype = $_POST['newstype'];
	$newsimg = $_POST['newsimg'];
	$newstime = $_POST['newstime'];
	$newssrc = $_POST['newssrc'];
	$id = $_POST['newsid'];
	$onfocus = $_POST['onfocus'];
//插入到数据库中
	$sql = "UPDATE news SET newstitle = '{$newstitle}',newstype = '{$newstype}',newsimg = '{$newsimg}',newstime = '{$newstime}',newssrc = '{$newssrc}',onfocus = '{$onfocus}' WHERE id = {$id}";
	mysqli_query($link,"SET NAMES utf8");
	mysqli_query($link,$sql);
	echo json_encode(array("updatemsg"=>"from server:修改成功!"));
}

mysqli_close($link);
?>