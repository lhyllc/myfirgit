var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//建立数据库链接池
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'baidunews'
});


/**
 * 主页获取新闻列表
 * 按前端发来的数据条件获取数据库信息,并响应给前端,
 * @param  {[type]} req   [请求]
 * @param  {[type]} res   [响应]
 * @param  {[type]} next
 */
router.get('/news', function(req, res, next) {
	// 前端传过来数据
    var newstype = req.query.newstype;

    pool.query('SELECT * FROM `news` WHERE `newstype` = ? order by id desc', [newstype], function(error, results, fields) {
        // if (error) throw error;
        // console.log(results);
        if (results == "") {
            res.json({ "newsdata": "null" });
        } else {
            res.json(results);
        }
    });
});

/**
 * 主页获取幻灯片图片
 * @param  {[type]} req   [请求]
 * @param  {[type]} res   [响应]
 * @param  {[type]} next
 */
router.get('/focusnews', function(req, res, next) {
    pool.query('SELECT * FROM `news` WHERE `onfocus` = 1 order by id desc',function (error, results, fields) {
        if (results == "") {
            res.json({ "newsdata": "null" });
        } else {
            res.json(results);
        }
    });
});





// pool.end();
module.exports = router;
