<?php

require_once("config.php");

if($link){
	//获得POST发来的数据
	$newstitle = $_POST['newstitle'];
	$newstype = $_POST['newstype'];
	$newsimg = $_POST['newsimg'];
	$newstime = $_POST['newstime'];
	$newssrc = $_POST['newssrc'];
	$onfocus = $_POST['onfocus'];
//插入到数据库中
	$sql = "INSERT INTO news VALUES ('','{$newstitle}', '{$newstype}', '{$newsimg}', '{$newstime}','{$newssrc}','{$onfocus}')";
	mysqli_query($link,"SET NAMES utf8");
	mysqli_query($link,$sql);
	echo json_encode(array("insertmsg"=>"from server:添加成功!"));
}

mysqli_close($link);
?>