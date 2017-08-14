<?php
header("Content-type:application/json;charset=utf-8");
//配置数据库信息
  $hostname = 'localhost';  
  $port = '3306';
  $dbuser = 'root';     
  $dbpassword = '';
  $dbname = 'baidunews';




//链接数据库
  $link = mysqli_connect($hostname,$dbuser,$dbpassword,$dbname,$port); 
?> 