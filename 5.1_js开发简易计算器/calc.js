var checkPoint = 0;//判断是否输入小数点
var checkYsf = 0;//判断是否已输入运算符
var result = 0;//判断是否已经结算过


// 清空所有数据
function clearNum() {
  document.getElementById('showScreen').value = ""; //清空结果显示
  document.getElementById('X').value = ""; //	清空x的值
  document.getElementById('Y').value = ""; //清空y的值
  document.getElementById('YSF').value = ""; // 清空运算符
  document.getElementById('error').innerHTML = ""; // 清空错误提示
  checkPoint = 0; //
  checkYsf = 0; //
  result = 0 //
}

// 获得数字
function getNum(Num) {
	if (result == 1) {
		document.getElementById("showScreen").value = "";
	}
	document.getElementById('error').innerHTML = "";
	if (checkYsf == 0) {//判断数字是放在运算符前面还是后面
	   	document.getElementById('X').value += document.getElementById(Num).value;//第一个数
	   	
	} else {
		document.getElementById('Y').value += document.getElementById(Num).value;//第二个数
		
	}
	
}

// 获得小数点
function getPoint(Num) {
	document.getElementById('error').innerHTML = "";//清除错误提示
	x = document.getElementById('X').value;
	y = document.getElementById('Y').value;
if (checkPoint == 0) {//判断是否已经获得小数点，是则返回错误
	if (checkYsf == 0) {//判断是否已经获得运算符，是则又可以输入小数点，
		if (x == "") {
			document.getElementById('X').value = "0";
			document.getElementById('X').value += document.getElementById(Num).value;
			checkPoint = 1;
		} else {
			document.getElementById('X').value += document.getElementById(Num).value;
			checkPoint = 1;
		}
	 
	} else {
		if (y == "") {
			document.getElementById('Y').value = "0";
			document.getElementById('Y').value += document.getElementById(Num).value;
			checkPoint = 1;
		} else {
			document.getElementById('Y').value += document.getElementById(Num).value;
			checkPoint = 1;
		}

	}
}else{
		document.getElementById('error').innerHTML = "不能重复输入小数点";
	}
}

// 获得运算符
function getYsf(Num) {
	if (result == 1) {//判断是否已经计算结果，不能直接用结果来作为第一个数。
		document.getElementById("showScreen").value = "";
	}
	if (document.getElementById('X').value != "") { //判断第一个数是否为空，为空则不允许先输入运算符
		if (checkYsf == 0) {//判断运算符是否已经输入过，是 则不允许再输入
				document.getElementById('YSF').value = document.getElementById(Num).value;
				checkYsf = 1;
				checkPoint = 0;
			} else {
				document.getElementById('error').innerHTML = "不能重复输入运算符";
			}
	}else {
		document.getElementById('error').innerHTML = "不能以 "+ Num +" 运算符开始";
	}
	 
		

}


// 计算结果
function getCount() {
	var x = Number(document.getElementById('X').value);
	var y = Number(document.getElementById('Y').value);
	var ysf = document.getElementById('YSF').value;
	var count = 0;
	switch (ysf){
		case "＋":
			count = x + y;
			break;
		case "－":
			count = x - y;
			break;
		case "×":
			count = x * y;
			break;
		case "÷": //除法运算时，检查除数是否为0。
			if (y != 0) { 
			    count = x / y;
			    break;
			}
			else {
			    document.getElementById('error').innerHTML = "除数为0了！";
			    break;
			}
		case "%": //求余数运算时，检查除数是否为0。
			if (y != 0) { 
			    count = x % y;
			    break;
			}
			else {
			    document.getElementById('error').innerHTML = "除数为0了！";
			    break;
			}
	}
  document.getElementById("showScreen").value = Number((count).toFixed(8)); //将toFixed得到的8位字符串再转换成数字类型 ，优化显示效果
  document.getElementById('X').value = ""; //	清空x的值
  document.getElementById('Y').value = ""; // 清空y的值
  document.getElementById('YSF').value = ""; // 清空运算符
  checkPoint = 0; 
  checkYsf = 0;
  result = 1;
}
