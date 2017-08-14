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
 * 后台主页获取新闻列表
 * 按数据条件获取数据库信息,并响应请求,
 * @param  {[type]} req   [请求]
 * @param  {[type]} res   [响应]
 * @param  {[type]} next
 */
router.get('/getnews', function(req, res,next) {
    var newstype = req.query.newstype;

	if (newstype == "") {
		pool.query('SELECT * FROM `news` order by id desc', function(error, results, fields) {
	        // if (error) throw error;
	        // console.log(results);
	        if (results == "") {
	            res.json({ "newsdata": "null" });
	        } else {
	            res.json(results);
	        }
	    });
	} else {
		pool.query('SELECT * FROM `news` WHERE `newstype` = ? order by id desc',[newstype], function(error, results, fields) {
	        // if (error) throw error;
	        // console.log(results);
	        if (results == "") {
	            res.json({"newsdata": "null"});
	        } else {
	            res.json(results);
	            console.log(results);
	        }
	    });
	}
    



});


/**
 * 插入数据库
 */
router.post('/insert', function(req, res,next) {
	var newstitle = req.body.newstitle;
	var newstype = req.body.newstype;
	var newsimg = req.body.newsimg;
	var newstime = req.body.newstime;
	var newssrc = req.body.newssrc;
	var onfocus = req.body.onfocus;
    pool.query("INSERT INTO news VALUES ('',?,?,?,?,?,?)", [newstitle,newstype,newsimg,newstime,newssrc,onfocus], function(error, results, fields) {
        
        res.json({"insertmsg":"from server:添加成功!"});
    });
});

/**
 * 删除指定ID数据
 */
router.post('/delete', function(req, res,next) {
	var newsid = req.body.newsid;
	
    pool.query('DELETE FROM news WHERE id = ?', [newsid], function(error, results, fields) {
            console.log(results.affectedRows);
            res.json({"delmsg":"from server:删除成功!"});
    });
});


/**
 * 更新查询数据
 */
router.post('/curnews', function(req, res,next) {
	var newsid = req.body.newsid;
	
    pool.query('SELECT * FROM news WHERE id = ?', [newsid], function(error, results, fields) {
    	res.json(results);
       	// res.json({'updatemsg':'from server:查询'});
    });
});
/**
 * 更新插入数据库
 */
router.post('/update', function(req, res,next) {
	var newstitle = req.body.newstitle;
	var newstype = req.body.newstype;
	var newsimg = req.body.newsimg;
	var newstime = req.body.newstime;
	var newssrc = req.body.newssrc;
	var onfocus = req.body.onfocus;
	var id = req.body.newsid;
    pool.query("UPDATE news SET newstitle = ?,newstype = ?,newsimg = ?,newstime = ?,newssrc = ?,onfocus = ? WHERE id = ?", [newstitle,newstype,newsimg,newstime,newssrc,onfocus,id], function(error, results, fields) {
     
        res.json({"insertmsg":"from server:添加成功!"});
    });
});








module.exports = router;
