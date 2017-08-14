// jquery start
$(document).ready(function() {
	
    //更多产品 toggle
    var moreprobox = $("#moreprobox");
    $("#morepro").mouseenter(function() {
        moreprobox.fadeIn(100);
    });
    moreprobox.mouseleave(function() {
        moreprobox.fadeOut(100);
    });

	//百度会员 Toggle
	var memberbox = $("#memberbox");
	toggle($("#member"),memberbox);

 	//设置 toggle
 	var setingbox = $("#setingbox");
 	toggle($("#seting"),setingbox);

	//顶部隐藏搜索条、返回顶部 fadeToggle //新闻排行固定 // 判定屏幕滚动高度来执行不同的事件
	var sDown = $("#s-down");
	var nrw = $("#news-rank-wrapper");
    $(window).scroll(function() {
	    //回到顶部
	    if ($(window).scrollTop() > 20) {
	        $("#top-feed").fadeIn(500);
	        
	    } else {
	        $("#top-feed").hide();
	    }
	    //下拉搜索条
	    if ($(window).scrollTop() > 157) {
	        sDown.show();
	        $("#top_logo").fadeIn(500);
	    } else {
	        $("#top_logo,#s-down").hide();
	    }
	    //下拉搜索条透明
	    if ($(window).scrollTop() > 225) {
			sDown.css("background-color","rgba(255,255,255,.95)");
	    }else{
	    	sDown.css("background-color","#fff");
	    }
	    //新闻排行
	    if ($(window).scrollTop() > 260) {
	    	var nrwnum = $(window).scrollTop() - 200;
	    	nrw.css("top",nrwnum);
	    } else{
	    	nrw.css("top",60);
	    }

	});

    // 返回顶部 click
    $("#top-feed").click(function(){  
        $('body,html').animate({scrollTop:0},500); // 返回动画时间 
        return false;  
    });  
    // 主体区域tab切换
    var liNode = $("#tabtitle li");//当前li标签
    var conNode = $("div.tabnav-con");//的内容块
    $("#tabtitle li").each(function(index) {
		$(this).click(function() {
    		conNode.removeClass("block");
    		$("#tabtitle li.current").removeClass("current");
    		conNode.eq(index).addClass("block");
    		$(this).addClass("current");
    		setCookie("tabtitleLiIndex",index);
		})
    });
    //读取tab切换的cookie值
	var cv = getCookie("tabtitleLiIndex");
	if (getCookie("tabtitleLiIndex")) {
		liNode.eq(cv).addClass("current");
		conNode.eq(cv).addClass("block");
	} else {
		liNode.eq(0).addClass("current");
		conNode.eq(0).addClass("block");
	}

	//我的导航 隐藏显示 点击事件
	var emi = 0;
	$("#wddh-title").click(function() {
		$("#wddh-con").toggle();
		if (emi % 2 == 0) {
			$("#wddh-title em").addClass("act");
		} else {
			$("#wddh-title em").removeClass("act");
		}
		emi++;
		
	});


    // 隐藏 / 显示频道 点击事件
    var hidechannel = $("#hidechannel");
    var showchannel = $("#showchannel");
    var maincon = $("#maincon");
    hidechannel.click(function() {
    	hidechannel.hide();
    	maincon.hide();
    	showchannel.fadeIn("slow");
    	setCookie("channelStatus","off")
    	$("#footer").addClass("ft-fiexd");
    });
    showchannel.click(function() {
    	showchannel.hide();
    	maincon.fadeIn("slow");
    	hidechannel.show();
    	setCookie("channelStatus","on")
    	$("#footer").removeClass("ft-fiexd");
    });
    //读取隐藏 / 显示频道 cookie值
    if (getCookie("channelStatus") == "off") {
    	hidechannel.hide();
    	maincon.hide();
    	showchannel.show();
    	$("#footer").addClass("ft-fiexd");
    } else {
    	hidechannel.show();
    	maincon.show();
    	showchannel.hide();
    	$("#footer").removeClass("ft-fiexd");
    }


	//换一换新闻排行
	var rankcon = $("#rank .rankcon");
	var i = 0;
	rankcon.eq(i).show();
	$("#hyh").click(function() {
		rankcon.eq(i).fadeOut();
		i += 1;
		if (i < rankcon.length) {
			rankcon.eq(i).fadeIn();
		} else {
			i=0;
			rankcon.eq(i).fadeIn();
		}
	});
	
	//打开、收起换肤
	var skinContainer = $("#skin-container");
	$("#changeskin").click(function() {
		skinContainer.slideDown();
	});
	$("#shouqi,#container").click(function() {
		skinContainer.slideUp();
	});
	
	
	//更换皮肤
	$("#skin-img-list li").each(function(index) {
		// 预览
		$(this).mouseover(function() {
			var imgsrc = "./images/skin/sm"+index+".jpg";
			$("#down-img").attr("src",imgsrc);
		});
		// 换肤
		$(this).click(function() {
			var bgimg = "url(\"./images/skin/big"+index+".jpg\")";
			$("body").css({
				"background-image":bgimg,
				"background-color":"#404040",
			});
			addSkinStyle();
			setCookie("skinStatus","on");
			setCookie("bgurl",bgimg);

		});
	});

	//改变皮肤后主页更换的样式
	function addSkinStyle() {
		$("#lg-img").attr("src","./images/logo_white.png");
		$("header").addClass("hdskin");
		$(".tool>a,.hdnav>a,#w-city,#w-temp,#w-weather,#w-wind,#w-aqi").addClass("white");
		$("#ipt").removeClass("ipt").addClass("skin-ipt");
		$("#mainbtn").addClass("skinbtn");
		$("#go-top").removeClass("go-top").addClass("skin-go-top");
		$("#footer").addClass("skin-footer");
	}
	//还原默认样式
	function delSkinStyle() {
		$("#lg-img").attr("src","./images/logo.png");
		$("header").removeClass("hdskin");
		$(".tool>a,.hdnav>a,#w-city,#w-temp,#w-weather,#w-wind,#w-aqi").removeClass("white");
		$("#ipt").addClass("ipt").removeClass("skin-ipt");
		$("#mainbtn").removeClass("skinbtn");
		$("#go-top").addClass("go-top").removeClass("skin-go-top");
		$("#footer").removeClass("skin-footer");
	}

	// 判断cookie是否有换肤值
	if (getCookie("skinStatus") == "on") {
		$("body").css({
				"background-image": getCookie("bgurl"),
				"background-color":"#404040",
			});
		addSkinStyle();
	} else {
		$("body").css({
				"background-image": "",
				"background-color":"#fff",
			});
		delSkinStyle();
	}

	//点击不使用皮肤事件
	$("#normal").click(function() {
		$("body").css({
				"background-image": "",
				"background-color":"#fff",
			});
		delSkinStyle();
		setCookie("skinStatus","off");
	});

	// 根据ip判断所在城市
	function getCity() {
	    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
	        if (remote_ip_info.ret == '1') {
	        	// console.log(remote_ip_info.city);
	            return remote_ip_info.city;
	        } else {
	            return "北京";
	        }
	    });
	}

	//获得天气情况 
	$.ajax({
	    type: 'GET',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    jsonpCallback: 'getName',
	    url: 'http://api.asilu.com/weather/',
	    data: {
	    	"city": getCity()
	    },
	    success: function(data) {
	        // console.log(data);
	        $('#w-city').text(data.city);
	        $('#w-icon').css("background-image","url(\"./images/weather/"+data.weather[0].icon1+".png\")");
	        $('#w-temp').text(data.weather[0].temp);
	        $('#w-weather').text(data.weather[0].weather);
	        $('#w-wind').text(data.weather[0].wind);
	        $('#w-aqi-level').text(aqiAnalysis(data.pm25));
	        $('#w-aqi').text(data.pm25);
	        //未来4天的天气情况
	        for (var i = 0; i < data.weather.length; i++) {
	        	var gethtml =  "<li><a href='http://www.weather.com.cn/' target='_blank'><p>"+ data.weather[i].date+ "</p><img src='./images/weather/"+data.weather[i].icon1+".jpg' alt='天气情况'><p>"+data.weather[i].temp+"</p><p>"+data.weather[i].weather+"</p><p>"+data.weather[i].wind+"</p></a></li>";
	        	$("#weather-setting-content").append(gethtml);
	        }
	        
	    },
	});

	//打开隐藏天气情况
	var timeoutid;
	var weather = $("#weather");
	var weatherSettingWrapper = $("#weather-setting-wrapper");
	weather.mouseenter(function() {
		timeoutid = setTimeout(function() {
		weatherSettingWrapper.fadeIn(300);
		},300);
	}).mouseleave(function() {
		clearTimeout(timeoutid);
		weatherSettingWrapper.fadeOut(300);
	});








});
//jquery end

//天气 AQI 分析
function aqiAnalysis(aqi) {
	if (aqi < 51) {
		return "优";
	} else if(aqi < 101) {
		return "良";
	} else if(aqi < 151) {
		return "轻度污染";
	} else if(aqi < 201) {
		return "中度污染";
	} else if(aqi < 301) {
		return "重度污染";
	} else{
		return "严重污染";
	}
}
//会员、设置的公共切换函数
function toggle(selector1,selector2) {
	selector1.hover(function() {
	    selector2.show();
	}, function() {
	    selector2.hide();
	});
	selector2.hover(function() {
	    selector2.show();
	}, function() {
	    selector2.hide();
	});
}
//写入指定cookie值 localstorage和cookie两种方式写入
function setCookie(key,value) {
	if (window.localStorage) {
	    localStorage.setItem(key,value);	
	} else {
	    document.cookie = key+"="+value;
	}
}
//从客户端读取相应的cookie值
function getCookie(key) {
	if (window.localStorage) {
		if (localStorage.getItem(key)) {
			return localStorage.getItem(key);
		} else {
			return false;//没有存储值，返回 false;
		}
	} else {
		var cookieArray = document.cookie.split(";");
		for (var i = 0; i < cookieArray.length; i++) {
			if ( cookieArray[i].split("=")[0] == key ) {
				return cookieArray[i].split("=")[1];
			}
		}
		return false;//没有存储值，返回 false;
	}
}


