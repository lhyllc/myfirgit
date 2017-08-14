var picturewall = $("#picturewall");
// 滚动加载的图片路径
var dataImg = {"data":[{"src":"01.jpg"},{"src":"03.jpg"},{"src":"12.jpg"},{"src":"07.jpg"},{"src":"10.jpg"},{"src":"11.jpg"}]};
// 滚动加载后图片的信息
var dataImginfo = ["新加载图片信息1","新加载图片信息2","新加载图片信息3","新加载图片信息4","新加载图片信息5","新加载图片信息6"];

$(document).ready(function() {
	imgLocation();
	window.onscroll = function() {
		if (scrollLoad()) {
			$.each(dataImg.data,function(index,value) {
				var box = $("<div>").addClass("picbox").appendTo(picturewall);
				$("<img>").attr("src","./images/"+$(value).attr("src")).appendTo(box);/*追加图片路径*/
				$("<div>").addClass("picinfo").text(dataImginfo[index]).appendTo(box);/*追加图片信息*/
			});
		imgLocation();
		}
	}
});

//确定图片的位置
function imgLocation() {
	var picbox = $(".picbox");
	//获得图片盒子的外层宽度（包括padding）
	var picboxWidth = picbox.eq(0).outerWidth();
	//计算每一行能放置图片的个数
	var num = Math.floor(picturewall.width() / picboxWidth);
	// 存放每一列的高度
	var picboxHeightArr = [];
	// 遍历元素给其设置合适的位置
	picbox.each(function(index,value) {
		var picboxHeight = picbox.eq(index).outerHeight();
		if (index < num) {
			picboxHeightArr[index] = picboxHeight;/*存放第一排每一列的高度*/
		}else{
			var minpicboxHeight = Math.min.apply(null,picboxHeightArr);/*找到第一排高度最小的值*/
			var minpicboxIndex = $.inArray(minpicboxHeight,picboxHeightArr);/*找到第一排高度最小的位置*/
			/*给第二排之后的元素设置合适的位置*/
			$(value).css({
				"position":"absolute",
				"top":minpicboxHeight + 1,
				"left":picbox.eq(minpicboxIndex).position().left
			});
			picboxHeightArr[minpicboxIndex] += picbox.eq(index).outerHeight();/*修改数组中高度最小的值*/
		}
	});
}

//滚动加载图片
function scrollLoad() {
	var picbox = $(".picbox");
	var lastboxHeight = picbox.last().get(0).offsetTop + Math.floor(picbox.last().outerHeight() / 2);
	var documentHeight = $(window).innerHeight();
	var scrollHeight = $(window).scrollTop();
	// console.log("最后一张图片高度："+lastboxHeight+"px;滚动高度："+scrollHeight+"px;页面高度："+documentHeight);
	return (lastboxHeight < scrollHeight + documentHeight)?true:false;
}