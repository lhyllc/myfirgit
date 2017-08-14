// jquery start
$(document).ready(function() {
	//顶部导航菜单切换
	navMenu("#zhiye","#zhiyesub");
	navMenu("#huiyuan","#huiyuansub");
	navMenu("#jike","#jikesub");
	navMenu("#mobile-icon","#mobile-icon-drop");
	navMenu("#member-icon","#member-icon-drop");
	//顶部导航菜单切换样式封装
	function navMenu(id1,id2) {
		var STO;
		$(id1).mouseenter(function() {
			STO = setTimeout(function() {
				$(id2).fadeIn(300);
			},100);	
		}).mouseleave(function() {
			clearTimeout(STO);
			$(id2).hide();
		})
	}
	// 顶部搜索隐藏
	$("#search-icon").click(function () {
		$("#hd-search").show(500);
	});
	$("#seach-close").click(function () {
		$("#hd-search").hide(500);
	});

	//侧边栏隐藏菜单
	asideMenu("#cList1","#ls1");
	asideMenu("#cList2","#ls2");
	asideMenu("#cList3","#ls3");
	asideMenu("#cList4","#ls4");
	asideMenu("#cList5","#ls5");
	asideMenu("#cList6","#ls6");
	asideMenu("#cList7","#ls7");
	asideMenu("#cList8","#ls8");
	asideMenu("#cList9","#ls9");
	asideMenu("#cList10","#ls10");
	//侧边栏隐藏菜单切换样式封装
	function asideMenu(id1,id2) {
		$(id1).mouseenter(function() {
			$(id2).show();
		}).mouseleave(function() {
			$(id2).hide();
		})
	}

	// 分类隐藏切换
	sortMenu("#sort1","#sort1-dd");
	sortMenu("#sort2","#sort2-dd");
	sortMenu("#sort3","#sort3-dd");
	sortMenu("#sort4","#sort4-dd");
	// 分类样式封装
	function sortMenu(id1,id2) {
		var STO;
		$(id1).mouseenter(function() {
			STO = setTimeout(function() {
				$(id2).slideDown();
			},100);	
		}).mouseleave(function() {
			clearTimeout(STO);
			$(id2).slideUp();
		});
	}

	// 点击按行显示/按列显示
	var changeId = $("#changeid");
	var listcolIcon = $("#listcol .icon");
	var listrowIcon = $("#listrow .icon");
	$("#listcol").click(function() {
		colEvent();
		changeId.removeClass("lesson-list-row").addClass("lesson-list");
		listcolIcon.addClass("on");
		listrowIcon.removeClass("on");
		setCookie("listColCookie","on");
	});
	$("#listrow").click(function() {
		rowEvent();
		changeId.removeClass("lesson-list").addClass("lesson-list-row");
		listrowIcon.addClass("on");
		listcolIcon.removeClass("on");
		setCookie("listColCookie","off");
	});

	//通过cookie的值来判断哪种显示方式
	if (getCookie("listColCookie") == "off") {
		changeId.removeClass("lesson-list").addClass("lesson-list-row");
		listrowIcon.addClass("on");
		listcolIcon.removeClass("on");
		rowEvent();
	} else {
		changeId.removeClass("lesson-list-row").addClass("lesson-list");
		listcolIcon.addClass("on");
		listrowIcon.removeClass("on");
		colEvent();
	}

	// 当按列显示时，给每个li添加不同id, 并给每个id下的指定的元素添加鼠标经过和移除事件
	function colEvent() {
		$("#xiangxi,#dengji,#rensu").hide();
		$("#changeid li").each(function(index) {
			var listid = "list"+index;
			// 给每个li设置一个不同的id
			$(this).attr("id",listid);
			// 每个li下，当鼠标滑过是需要改变样式的元素
			var toggleElement = $("#"+listid+" #xiangxi,#"+listid+" #dengji,#"+listid+" #rensu");
			// console.log(toggleElement);
			// 给每个里设置鼠标经过事件
			var liSTO;
			$(this).mouseenter(function() {
				liSTO = setTimeout(function() {
					toggleElement.slideDown();
				},200);
			}).mouseleave(function() {
				clearTimeout(liSTO);
				toggleElement.slideUp("fast");
			});
			//给每一行最后一个设置右外边距为 0
			if ( ((index+1) % 3) == 0) {
				$(this).addClass("mar-r0");
			}
		}); 
	}

	// 当按行显示时，清除列显示时的鼠标经过事件
	function rowEvent() {
		$("#xiangxi,#dengji,#rensu").show();
		$("#changeid li").unbind("mouseenter mouseleave");
		
	}

	//返回顶部
	var go_top = $("#go_top");
	go_top.hide();
	$(window).scroll(function () {
		if ($(window).scrollTop()>50) {
			go_top.fadeIn();
		} else {
			go_top.fadeOut();
		}
	});
	go_top.click(function(){  
	    $('body,html').animate({scrollTop:0},300); // 返回动画时间 
	    return false;  
	});



});
// jquery end


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
			return false;
		}
	} else {
		var cookieArray = document.cookie.split(";");
		for (var i = 0; i < cookieArray.length; i++) {
			if ( cookieArray[i].split("=")[0] == key ) {
				return cookieArray[i].split("=")[1];
			}
		}
		return false;
	}
}