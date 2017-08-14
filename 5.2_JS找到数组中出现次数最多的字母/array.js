
function tjArr() {
	var str = document.getElementById('ipt').value; //获得用户输入的字符串
	var arr = str.split(","); //将字符串转换成数组
	var count = 1; //出现的次数,默认1次
	var maxCount = 1; // 最大出现的次数,默认1次
	var elePosition = ""; //元素出现的位置
	var maxElePosition = ""; //出现次数最多的元素出现的位置
	var maxEle = ""; //出现次数最多的元素
	var mstr = arr[0]; //用来比较出现最多次数的数是否重复，假设第0个就是出现最多的数

	if (str == "") {
		document.getElementById('result-wrapper').innerHTML = "word个亲，总得输入点数据吧！";
		return false;
	}
	for (var i = 0; i < arr.length; i++) {
		count = 1;
		elePosition = "";

		for (var j = i+1; j < arr.length; j++) {//统计出现最多的次数，并记录元素的下标
			if (arr[i] === arr[j]) {
				count++;//次数
				elePosition += j+","; //下标
			}
		}


		if (count > maxCount) { //如果元素的统计次数大于最大默认次数
			maxCount = count; //修改最大默认次数
			maxEle = arr[i] ; //返回元素
			maxElePosition = "<i>{"+i+","+elePosition+"}</i>"; //返回元素下边
		}else if(count === maxCount){//如果元素的统计次数等于最大默认次数，就要判断是不是同一个元素，
			if (mstr === arr[i]) {//如果是同一个元素，就只打印一次
				mstr === arr[i]
				maxEle = arr[i];
				maxElePosition = "<i>{"+i+","+elePosition+"}</i>";
			} else {//如果不是同一个元素，就要追加打印。
				maxEle += "," + arr[i];
				maxElePosition += "<i>{"+i+","+elePosition+"}</i>";
			}
		}

	}
	// console.log("出现次数最多的是"+maxEle+"：出现了"+maxCount+"次，出现的位置为："+maxElePosition);


	//输出到html中
	document.getElementById('resultA').innerHTML = "你输入的数组是：["+arr+"]";
	document.getElementById('resultB').innerHTML = "数组长度为："+arr.length;
	document.getElementById('resultC').innerHTML = "出现次数最多的是："+maxEle;
	document.getElementById('resultD').innerHTML = "次数为："+maxCount;
	document.getElementById('resultE').innerHTML = "出现的位置分别是："+maxElePosition;

}






