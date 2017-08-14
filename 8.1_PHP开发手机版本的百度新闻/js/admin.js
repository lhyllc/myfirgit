$(document).ready(function() {
	//刷新新闻列表
	refreshNews("");
	//添加新闻
	addNews();
	//删除新闻
	deleteNews();
	// 修改新闻
	updateNews();

    //获得当前事件的新闻信息
    $("#panel-heading li").click(function(e) {
        var type = $(this).text();
        refreshNews(type);
    });


});
/**
 * 刷新 新闻列表
 * @return 
 */
function refreshNews(ntype) {
	var newsTable = $("#newstable tbody");
	newsTable.empty();
	$.ajax({
		url:'./server/getnews.php',
		type:'get',
		dataType:'json',
        data:{newstype:ntype},
		success:function (data) {
			// 如果数据库中没有值，显示提示信息
			if(data.newsdata == "null"){
				var td = $("<td></td>").attr("colspan","7").html("数据库中没有数据");
				var tr = $("<tr></tr>").append(td);
				newsTable.append(tr);
			}else{
				$.each(data,function(index,value) {
					var tdid = $("<td></td>").html(value.id);
					var tdtype = $("<td></td>").html(value.newstype);
					var tdtitle = $("<td></td>").html(value.newstitle);
					if(value.onfocus == 1){
						$("<span></span>").html("幻灯").addClass("onfocuscss").appendTo(tdtitle);
					}
					var tdtime = $("<td></td>").html(value.newstime);
					var tdcz = $("<td></td>");
					var btn1 = $("<buttom type=\"button\"></buttom>").html("编辑").addClass("btn btn-primary btn-xs").appendTo(tdcz);
					var btn1 = $("<buttom type=\"button\"></buttom>").html("删除").addClass("btn btn-danger btn-xs").appendTo(tdcz);
					var tr = $("<tr></tr>").append(tdid,tdtype,tdtitle,tdtime,tdcz);
					newsTable.append(tr);
				});
			}
		}
	});
}
/**
 * 消息提示
 * @param  {text}  提示信息的内容
 * @return 
 */
function alertmsg(text) {
	$("#messageModal").modal("show");
	$("#messageModal #modalContent").text(text);
}
/**
 * 添加新闻功能
 * @return
 */
function addNews() {
    $("#submit").click(function(e) {
        e.preventDefault();
        //定义input框
        var titleId = $("#newstitle");
        var typeId = $("#newstype");
        var imgId = $("#newsimg");
        var timeId = $("#newstime");
        var srcId = $("#newssrc");
        //判断是否选择推荐幻灯
        if($("#onfocus").is(':checked')){
        	var onfocusval = 1;
        }else{
        	onfocusval = 0;
        }
        // 获得表单数据		
        var jsonNews = {
                "newstitle": titleId.val(),
                "newstype": typeId.val(),
                "newsimg": imgId.val(),
                "newstime": timeId.val(),
                "newssrc": srcId.val(),
                "onfocus": onfocusval,
            }
            // 判断输入的值是否为空，如果输入正确，向服务端发送数据
        if(jsonNews.newstitle != "" && jsonNews.newstype != "" && jsonNews.newstime != "" && jsonNews.newsimg != "" && jsonNews.newssrc != "") {
            //打开ajax,把表单数据发送给服务器端insert.php文件处理
            $.ajax({
                url: "./server/insert.php",
                type: "post",
                dataType: "json",
                data: jsonNews,
                success: function(data) {
                    // console.log(data.insertmsg);
                    alertmsg("添加成功");
                    //发送数据后，刷新新闻列表
                    refreshNews("");
                }
            });

            //发送数据后，刷新添加新闻的输入框,防止重复输入
            titleId.val("");
            imgId.val("");
            srcId.val("");
        }
        //判断标题是否填写
        else if (jsonNews.newstitle == "") {
            alertmsg("请填写标题");
            titleId.parent().addClass("has-error");
        } else {
            titleId.parent().removeClass("has-error");
        }
        //判断图片地址是否填写
        if (jsonNews.newsimg == "") {
            alertmsg("请填写图片地址");
            imgId.parent().addClass("has-error");
        } else {
            imgId.parent().removeClass("has-error");
        }
        //判断新闻来源是否填写
        if (jsonNews.newssrc == "") {
            alertmsg("请填写新闻来源");
            srcId.parent().addClass("has-error");
        } else {
            srcId.parent().removeClass("has-error");
        }
        //判断新闻添加时间是否填写
        if (jsonNews.newstime == "") {
            alertmsg("请填写添加时间");
            timeId.parent().addClass("has-error");
        } else {
            timeId.parent().removeClass("has-error");
        }
    });
}

/**
 * 删除新闻功能
 * @return 
 */
function deleteNews() {
    var deleteId = "";
    var deletetitle = "";
    $("#newstable tbody").on("click", ".btn-danger", function() {
        $("#deleteModal").modal("show");
        deleteId = $(this).parent().prevAll().eq(3).html();
        deletetitle = $(this).parent().prevAll().eq(1).html();
        $("#deleteModal .modal-body p").html("标题为：" + deletetitle + "<br>删除后无法恢复哦！");
    });
    $("#deleteModal .btn-primary").click(function() {
        if (deleteId) {
            $.ajax({
                url: './server/delete.php',
                type: 'post',
                dataType:'json',
                data: { newsid: deleteId },
                success: function(data) {
                    // console.log(data.delmsg);
                    $("#deleteModal").modal("hide");
                    refreshNews("");
                }
            });
        }

    });
}
/**
 * 数据更新
 * @return 
 */
function updateNews() {
	// 查询部分
	var updateId = "";
    $("#newstable tbody").on("click", ".btn-primary", function() {
        $("#updateModal").modal("show");
        updateId = $(this).parent().prevAll().eq(3).html();
        $.ajax({
            url: './server/curnews.php',
            type: 'post',
            dataType:'json',
            data: { newsid: updateId },
            success: function(data) {
            	$("#upnewstitle").val(data[0].newstitle);
		        $("#upnewstype").val(data[0].newstype);
		        $("#upnewsimg").val(data[0].newsimg);
		        $("#upnewstime").val(data[0].newstime);
		        $("#upnewssrc").val(data[0].newssrc);
		        // console.log(data[0].onfocus);
		        // $("#updateModal .checkbox label").html(data[0].onfocus);
		        if (data[0].onfocus == 1) {
		        	$("#uponfocus").prop("checked","checked");
		        }else{
		        	$("#uponfocus").removeAttr("checked");
		        }
            }
        });
        // refreshNews("");
    });
    // 更新部分
    $("#updateModal .btn-primary").click(function() {
    	//判断是否选择推荐幻灯
        if($("#uponfocus").is(':checked')){
        	var uponfocusval = 1;
        }else{
        	uponfocusval = 0;
        }
        // 获得表单数据		
        var upjsonNews = {
        		"newsid":updateId,
                "newstitle": $("#upnewstitle").val(),
                "newstype": $("#upnewstype").val(),
                "newsimg": $("#upnewsimg").val(),
                "newstime": $("#upnewstime").val(),
                "newssrc": $("#upnewssrc").val(),
                "onfocus": uponfocusval
            }
    	$.ajax({
            url: "./server/update.php",
            type: "post",
            dataType: "json",
            data: upjsonNews,
            success: function(data) {
                // console.log(data.updatemsg);
                //发送数据后，刷新新闻列表
                refreshNews("");
            }
        });
        $("#updateModal").modal("hide");
    });
}