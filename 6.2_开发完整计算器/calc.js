var x = ""; //用于存放第一个数
var y = ""; //用于存放第二个数
var ysf = ""; //用于存放运算符
var checkPoint = 0; //检查是否已经获得小数点
var checkYsf = 0; //检查是否已经输入运算符
var result = 0; //保存计算结果

// 清除所有内容
function clearAll(){
	document.getElementById('screen').innerHTML = "";//清除屏幕
	x = "";
	y = "";
	ysf = "";
	checkYsf = 0;
	checkPoint = 0;
	result = 0;
	clearMsg();//清除提示信息
}

// 获得数字
function getNum(event) {
	clearMsg();
	if(checkYsf == 0){
		x += event.innerText;//如果没有出现运算符，把当前值赋给 x;
	}else{
		y += event.innerText;//如果出现了运算符，把当前值赋给 y;
	}
	screenNum(); //输出到屏幕上
}

// 获得小数点
function getPoint(event) {
	if (checkYsf == 0) {
		if (checkPoint == 0) { //如果在x中没有出现个小数点，则可以输入，并更改状态
			if (x == "") {
				x = "0"+event.innerText;
			} else {
				x += event.innerText;
			}
			checkPoint = 1; //更改状态
		} else {
			msg("重复输入 "+event.innerText+" 了!");//提示信息
		}
	} else {
		if (checkPoint == 0) { //如果在x中没有出现个小数点，则可以输入，并更改状态
			if (y == "") {
				y = "0"+event.innerText;
			} else {
				y += event.innerText;
			}
			checkPoint = 1; //更改状态
		} else {
			msg("重复输入 "+event.innerText+" 了!");
		}
	}
	screenNum(); //输出到屏幕上
}

// 获得运算符
function getYsf(event) {
	if (x != "") {
		if(checkYsf == 0){
			clearMsg();
			ysf = event.innerText;
			checkPoint = 0;//又可以输入小数点了
		}else{
			msg("重复输入 "+event.innerText+" 运算符了!");
		}
		checkYsf = 1;//已经输入了运算符
		screenNum();//输出到屏幕上
	} else {
		clearAll();
		msg("运算符 "+event.innerText+" 不能放最前面");
	}
}

// 科学计数  sin(x),cos(x) 函数中的X是指“弧度”而非“角度”，弧度的计算公式为： 2*PI/360*角度
function getKXJS(argument) {
	var fh = argument.innerText;
	if (x != "") {
		var s = Number(x) * Math.PI / 180;
		if(fh == "sin"){
			s = Number(Math.sin(s).toFixed(8));
		}else if (fh == "cos") {
			s = Number(Math.cos(s).toFixed(8));
		} else {
			if(Number(Math.cos(s).toFixed(8)) != 0){ //正切 = sin/cos ,判断如果cos为 0 了，提示输入无效
				s = Number(Math.tan(s).toFixed(8));
			}else{
				clearAll();
				msg("无效输入");
				return;
			}
		}
		document.getElementById('screen').innerHTML = s;
		document.getElementById('history').innerHTML += "<p>"+argument.innerText+"("+x+")<em>=</em>"+s+"</p>";
		resetArgument();
	} else {
		clearAll();
		msg("先输数字后再输 "+argument.innerText);
	}
}

// 开根号
function getKaigen(argument) {
	if (x != "" && Number(x) >= 0) {
		var s = Number(Math.sqrt(Number(x)).toFixed(8));
		document.getElementById('screen').innerHTML = s;
		document.getElementById('history').innerHTML += "<p>"+argument.innerText+x+"<em>=</em>"+s+"</p>";
		resetArgument();
	} else {
		clearAll();
		msg("无效输入");
	}
}


//改变正负数
function changeZF() {
	if (checkYsf == 0) { //如果没有出现运算符，则操作x中数据
		if (x != "") {
			if(Number(x) > 0){ //如果是正数，在前面添加-号
				x = "-"+x;
			}else{
				x = x.substr(1);//去除-号
			}
		} else {
			msg("输入错误!请先输数字");
		}
	} else { //如果出现了运算符，则操作y中数据
		if (y != "") {
			if(Number(y) > 0){
				y = "-"+y;
			}else{
				y = y.substr(1);
			}
		} else {
			msg("输入错误!请先输数字");
		}
	}
	screenNum();//输出到屏幕上
}


// 计算结果
function getResult() {
	var a = Number(x);
	var b = Number(y);
	switch (ysf){
		case "+":
			result = a + b;
			break;
		case "-":
			result = a - b;
			break;
		case "×":
			result = a * b;
			break;
		case "÷": //除法运算时，检查除数是否为0。
			if (y != 0) { 
			    result = a / b;
			    break;
			}
			else {
			    msg("除数为0了!");
			    break;
			}
		case "%": //求余数运算时，检查除数是否为0。
			if (y != 0) { 
			    result = a % b;
			    break;
			}
			else {
			    msg("除数为0了!");
			    break;
			}
		case "∧": //求幂运算,幂数为0的结构都为1；
		if (y != 0) { 
		    result = Math.pow(a, b);
		    break;
		}
		else {
		    result = 1;
		    break;
		}
	}
	if (y == "") { //如果什么都没输入，点了=号提示错误信息
		msg("还有数没写完，不能点 = ");
		return;
	} else {
		document.getElementById('screen').innerHTML = Number(result.toFixed(8));
		sendResult(x,y,ysf,Number(result.toFixed(8)));//把当前x,y,ysf,result的值发送给记录页面
		resetArgument();
	}
}

// 重置所有参数
function resetArgument() {
	x = "";
	y = "";
	ysf = "";
	checkPoint = 0;
	checkYsf = 0;
	result = 0;
}
// 把点击过的内容打印在屏幕上面
function screenNum() {
	if (checkYsf == 1) {
		document.getElementById('screen').innerHTML = x+"<em>"+ysf+"</em>"+y;
	} else {
		document.getElementById('screen').innerHTML = x+ysf+y;
	}
	
}
//警告提示信息
function msg(message) {
	document.getElementById('msg').innerText = message;
}
// 清除提示信息
function clearMsg() {
	document.getElementById('msg').innerText = "";
}

//发送给记录页面
function sendResult(x,y,ysf,jieguo) {
	document.getElementById('history').innerHTML += "<p>"+x+"<em>"+ysf+"</em>"+y+"<em>=</em>"+jieguo+"</p>";
}


// 显示历史记录页面
function showHistory(){
	var h = document.getElementById("historywrapper");
	if (h.style.display == "block") {
		h.style.display = "none";
	} else {
		h.style.display = "block";
	}
}

//清空历史记录
function clearHistory() {
	document.getElementById('history').innerHTML = "";
}