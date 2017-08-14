var skinLink = document.getElementById("skinLink");

// 选择样式
function changeSkin(num) {
	switch (num) {
		case "default" :
			skinLink.href = "./css/default.css";
			break;
		case "one" :
			skinLink.href = "./css/skinone.css";
			break;
		case "two" :
			skinLink.href = "./css/skintwo.css";
			break;
		case "three" :
			skinLink.href = "./css/skinthree.css";
			break;
	}
	//判断浏览器是否支持localstorage
	if (window.localStorage) {
	    localStorage.setItem("OYskin",skinLink.href);	
	} else {
	    document.cookie = "OYskin=" + skinLink.href;
	}
}


// 检查存储的样式
function checkStorage() {
	if (window.localStorage) {
		if (localStorage.getItem("OYskin")) {
			skinLink.href = localStorage.getItem("OYskin");
		} else {
			skinLink.href = "./css/default.css";//没有存储样式，返回默认样式
		}
		
	} else { //ie浏览器读取cookie
		var cookiearray = document.cookie.split(";");
		for (var i = 0; i < cookiearray.length; i++) {
			if ( cookiearray[i].split("=")[0] == "OYskin" ) {
				return skinLink.href = cookiearray[i].split("=")[1];
			}
		}
		skinLink.href = "./css/default.css";//没有存储样式，返回默认样式
	}
}

checkStorage();

