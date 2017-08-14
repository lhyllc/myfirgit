$(document).ready(function () {

//默认显示的新闻信息
refreshNews('推荐');	

//获得当前事件的新闻信息
$('nav a').click(function(e) {
	e.preventDefault();
	var type = $(this).text();
	refreshNews(type);
});
//获取focus的信息
focusNews();



// 返回顶部
var go_top = $(".go-top");
go_top.hide();
$(window).scroll(function () {
	if ($(document).scrollTop() > 20) {
		go_top.fadeIn();
	} else {
		go_top.hide();
		}
});
go_top.click(function(){  
	    $('body,html').animate({scrollTop:0},300); // 返回动画时间 
	    return false;  
	});
// 返回顶部 end



});


/**
 * 刷新新闻列表
 * @param  {[type]} type [类型]
 * @return 
 */
function refreshNews(ntype) {
	var lists = $("#news-lists");
		lists.empty();

		$.ajax({
		url:'./server/getnews.php',
		type:'get',
		dataType:'json',
		data:{newstype:ntype},
		success:function (data) {
			if (data.newsdata != "null") {
				$.each(data,function(index,value) {
					var list = $("<li></li>").addClass("news-list").appendTo(lists);
					var newsimg = $("<div></div>").addClass("newsimg").appendTo(list);
					var img = $("<img>").attr({"src":value.newsimg,"alt":value.newstitle}).appendTo(newsimg);
					var newscontent = $("<div></div>").addClass("newscontent").appendTo(list);
					var h1 = $("<h1></h1>").html(value.newstitle).appendTo(newscontent);
					var p = $("<p></p>").appendTo(newscontent);
					var newstime = $("<span></span>").addClass("newstime").html(value.newstime).appendTo(p);
					var newssrc = $("<span></span>").addClass("newssrc").html(value.newssrc).appendTo(p);			
				});
			} else {
				$("<li></li>").addClass("news-list").html("没有找到数据……").appendTo(lists);
			}
		}
	});
	
}


/**
 * 获得焦点图片
 * @return 
 */
function focusNews() {
	var carousels = $("#carousel-inner");
		carousels.empty();

		$.ajax({
		url:'./server/getfocusnews.php',
		type:'get',
		dataType:'json',
		success:function (data) {
			if (data.newsdata != "null") {
				$.each(data,function(index,value) {
					var div = $("<div></div>").addClass("item").appendTo(carousels);
					if (index == 0) {
						div.addClass("active");
					}
					var img = $("<img>").attr({"src":value.newsimg,"alt":value.newstitle}).appendTo(div);
					var focuscontent = $("<div></div>").addClass("carousel-caption").html(value.newstitle).appendTo(div);			
				});
			} else {
				$("<p></p>").html("没有找到数据……").appendTo(carousels);
			}
		}
	});
}