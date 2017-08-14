$(document).ready(function() {
    // 单例设计模式
    var single = {
        init: function() {

            this.emi = 0;
            //更多产品
            this.moreprobox = $("#moreprobox");
            this.morepro = $("#morepro");
            // 百度会员
            this.memberbox = $("#memberbox");
            this.member = $("#member");
            //设置
            this.setingbox = $("#setingbox");
            this.seting = $("#seting");
            //滚动条相应变量
            this.window = $(window);
            this.topFeed = $("#top-feed");
            this.top_logo = $("#top_logo");
            this.top_logo_down = $("#top_logo,#s-down")
                // 主体区域tab切换
            this.liNode = $("#tabtitle li"); //当前li标签
            this.conNode = $("div.tabnav-con");
            //我的导航
            this.wddh = $("#wddh-title");
            // 隐藏 / 显示频道
            this.hidechannel = $("#hidechannel");
            this.showchannel = $("#showchannel");
            this.maincon = $("#maincon");
            //换一换新闻排行
            this.rankcon = $("#rank .rankcon");
            this.hyh = $("#hyh");

            this.skinContainer = $("#skin-container");
            this.shouqi_container = $("#shouqi,#container");
            this.changeskin = $("#changeskin");

                //加载绑定事件
            this.bind();

            //读取tab切换的cookie值
            var cv = getCookie("tabtitleLiIndex");
            if (cv) {
                this.liNode.eq(cv).addClass("current");
                this.conNode.eq(cv).addClass("block");
            } else {
                this.liNode.eq(0).addClass("current");
                this.conNode.eq(0).addClass("block");
            }
            //读取隐藏 / 显示频道 cookie值
            if (getCookie("channelStatus") == "off") {
                this.hidechannel.hide();
                this.maincon.hide();
                this.showchannel.show();
                $("#footer").addClass("ft-fiexd");
            } else {
                this.hidechannel.show();
                this.maincon.show();
                this.showchannel.hide();
                $("#footer").removeClass("ft-fiexd");
            }
        },
        bind: function() {
            this.morepro.bind(toggle(this.morepro, this.moreprobox));
            this.member.bind(toggle(this.member, this.memberbox));
            this.seting.bind(toggle(this.seting, this.setingbox));
            // 主体区域tab切换
            this.liNode.each(function(index) {
                $(this).bind({
                    click: function() {
                        var conNode = $("div.tabnav-con");
                        conNode.removeClass("block");
                        $("#tabtitle li.current").removeClass("current");
                        conNode.eq(index).addClass("block");
                        $(this).addClass("current");
                        setCookie("tabtitleLiIndex", index);
                    }
                })
            });
            //我的导航 隐藏显示 点击事件
            var emi = 0;
            this.wddh.bind({
                click: function() {
                    $("#wddh-con").toggle();
                    if (emi % 2 == 0) {
                        $("#wddh-title em").addClass("act");
                    } else {
                        $("#wddh-title em").removeClass("act");
                    }
                    emi++;
                }
            });
            // 隐藏频道 点击事件
            this.hidechannel.bind({
                click: function() {
                    $(this).hide();
                    $("#maincon").hide();
                    $("#showchannel").fadeIn("slow");
                    setCookie("channelStatus", "off")
                    $("#footer").addClass("ft-fiexd");
                }
            });
            //显示频道 点击事件
            this.showchannel.bind({
                click: function() {
                    $(this).hide();
                    $("#maincon").fadeIn("slow");
                    $("#hidechannel").show();
                    setCookie("channelStatus", "on")
                    $("#footer").removeClass("ft-fiexd");
                }
            });
            //换一换新闻排行
            var i = 0;
            this.rankcon.eq(i).show();
            this.hyh.bind({
                click: function() {
                    $("#rank .rankcon").eq(i).fadeOut();
                    i += 1;
                    if (i < $("#rank .rankcon").length) {
                        $("#rank .rankcon").eq(i).fadeIn();
                    } else {
                        i = 0;
                        $("#rank .rankcon").eq(i).fadeIn();
                    }
                }
            });
            //打开、收起换肤
            var skinContainer = $("#skin-container");
            this.changeskin.bind({
                click: function() {
                    skinContainer.slideDown();
                }
            });
            this.shouqi_container.bind({
                click: function() {
                    skinContainer.slideUp();
                }
            });
            //更换皮肤
            $("#skin-img-list li").each(function(index) {
                // 预览
                $(this).mouseover(function() {
                    var imgsrc = "./images/skin/sm" + index + ".jpg";
                    $("#down-img").attr("src", imgsrc);
                });
                // 换肤
                $(this).click(function() {
                    var bgimg = "url(\"./images/skin/big" + index + ".jpg\")";
                    $("body").css({
                        "background-image": bgimg,
                        "background-color": "#404040",
                    });
                    addSkinStyle();
                    setCookie("skinStatus", "on");
                    setCookie("bgurl", bgimg);
                });
            });
            //改变皮肤后主页更换的样式
            function addSkinStyle() {
                $("#lg-img").attr("src", "./images/logo_white.png");
                $("header").addClass("hdskin");
                $(".tool>a,.hdnav>a,#w-city,#w-temp,#w-weather,#w-wind,#w-aqi").addClass("white");
                $("#ipt").removeClass("ipt").addClass("skin-ipt");
                $("#mainbtn").addClass("skinbtn");
                $("#go-top").removeClass("go-top").addClass("skin-go-top");
                $("#footer").addClass("skin-footer");
            }
            //还原默认样式
            function delSkinStyle() {
                $("#lg-img").attr("src", "./images/logo.png");
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
                    "background-color": "#404040",
                });
                addSkinStyle();
            } else {
                $("body").css({
                    "background-image": "",
                    "background-color": "#fff",
                });
                delSkinStyle();
            }

            //点击不使用皮肤事件
            $("#normal").click(function() {
                $("body").css({
                    "background-image": "",
                    "background-color": "#fff",
                });
                delSkinStyle();
                setCookie("skinStatus", "off");
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
                    $('#w-icon').css("background-image", "url(\"./images/weather/" + data.weather[0].icon1 + ".png\")");
                    $('#w-temp').text(data.weather[0].temp);
                    $('#w-weather').text(data.weather[0].weather);
                    $('#w-wind').text(data.weather[0].wind);
                    $('#w-aqi-level').text(aqiAnalysis(data.pm25));
                    $('#w-aqi').text(data.pm25);
                    //未来4天的天气情况
                    for (var i = 0; i < data.weather.length; i++) {
                        var gethtml = "<li><a href='http://www.weather.com.cn/' target='_blank'><p>" + data.weather[i].date + "</p><img src='./images/weather/" + data.weather[i].icon1 + ".jpg' alt='天气情况'><p>" + data.weather[i].temp + "</p><p>" + data.weather[i].weather + "</p><p>" + data.weather[i].wind + "</p></a></li>";
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
                }, 300);
            }).mouseleave(function() {
                clearTimeout(timeoutid);
                weatherSettingWrapper.fadeOut(300);
            });

            //返回顶部
            this.topFeed.bind({
                click: function() {
                    $('body,html').animate({ scrollTop: 0 }, 500); // 返回动画时间 
                }
            });
            //给window滚动条绑定事件
            this.window.bind({
                scroll: function() {
                    var scrollHeight = $(window).scrollTop();
                    var sDown = $("#s-down");
                    var nrw = $("#news-rank-wrapper");
                    var nrwnum = scrollHeight - 200;
                    // console.log(scrollHeight);
                    //回到顶部隐藏、显示
                    if ($(window).scrollTop() > 0) {
                        $("#top-feed").fadeIn(500);
                    } else {
                        $("#top-feed").hide();
                    }
                    //下拉搜索条隐藏、显示
                    if (scrollHeight > 157) {
                        sDown.show();
                        $("#top_logo").fadeIn(500);
                    } else {
                        $("#top_logo,#s-down").hide();
                    }
                    //下拉搜索条透明
                    if (scrollHeight > 225) {
                        sDown.css("background-color", "rgba(255,255,255,.95)");
                    } else {
                        sDown.css("background-color", "#fff");
                    }
                    //新闻排行固定
                    if (scrollHeight > 260) {
                        var nrwnum = $(window).scrollTop() - 200;
                        $("#news-rank-wrapper").css("top", nrwnum);
                    } else {
                        $("#news-rank-wrapper").css("top", 60);
                    }
                }
            });


        }
    }
    single.init();


});

//会员、设置、更多产品 鼠标经过/移除事件函数
function toggle(selector1, selector2) {
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
//天气 AQI 分析
function aqiAnalysis(aqi) {
    if (aqi < 51) {
        return "优";
    } else if (aqi < 101) {
        return "良";
    } else if (aqi < 151) {
        return "轻度污染";
    } else if (aqi < 201) {
        return "中度污染";
    } else if (aqi < 301) {
        return "重度污染";
    } else {
        return "严重污染";
    }
}
//写入指定cookie值 localstorage和cookie两种方式写入
function setCookie(key, value) {
    if (window.localStorage) {
        localStorage.setItem(key, value);
    } else {
        document.cookie = key + "=" + value;
    }
}
//从客户端读取相应的cookie值
function getCookie(key) {
    if (window.localStorage) {
        if (localStorage.getItem(key)) {
            return localStorage.getItem(key);
        } else {
            return false; //没有存储值，返回 false;
        }
    } else {
        var cookieArray = document.cookie.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].split("=")[0] == key) {
                return cookieArray[i].split("=")[1];
            }
        }
        return false; //没有存储值，返回 false;
    }
}
