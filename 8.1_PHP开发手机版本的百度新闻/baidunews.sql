-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-03-02 02:49:37
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `baidunews`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `newstitle` varchar(200) NOT NULL,
  `newstype` varchar(200) NOT NULL,
  `newsimg` varchar(200) NOT NULL,
  `newstime` date NOT NULL,
  `newssrc` varchar(100) NOT NULL,
  `onfocus` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=101 ;

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`id`, `newstitle`, `newstype`, `newsimg`, `newstime`, `newssrc`, `onfocus`) VALUES
(86, '就是干！郭少33分兑现赛前诺言 辫子哥可后悔激怒他？', '推荐', 'http://t11.baidu.com/it/u=2765056471,1033493577&fm=170&s=AF2C6F87C20138FEED91452D03007042&w=218&h=146&img.JPEG', '2017-03-01', '凤凰体育', 0),
(87, '洪金宝向华强谁势力大 洪金宝和成龙谁势力大 洪金宝在香港的地位', '推荐', 'http://t12.baidu.com/it/u=1960855997,1337431593&fm=170&s=F2089D4718308E9A91ADD52A0300F019&w=500&h=284&img.JPEG&access=215967317', '2017-03-01', '八球体育', 1),
(88, '惊天冷门！遭恒大屠杀队差点胜日本劲旅 香港战亚冠第1分', '推荐', 'http://t10.baidu.com/it/u=3202611540,2132667234&fm=170&s=7992D8B140404AE248190DDD0300D072&w=639&h=425&img.JPEG&access=215967317', '2017-03-01', '凤凰体育', 1),
(89, '动物版“母爱如山倒” 仿佛看到了自己', '推荐', 'http://t10.baidu.com/it/u=1861410285,1157039971&fm=170&s=13B37A814863B4175A8900D50100D083&w=350&h=208&img.GIF&access=215967317', '2017-03-01', '搜狐新闻', 0),
(90, '关楚耀投资五百万台币 台湾餐厅开分店', '推荐', 'http://t10.baidu.com/it/u=766189686,2631002735&fm=170&s=E892759447AA50BC1BA1E4C20300C031&w=608&h=434&img.JPEG&access=215967317', '2017-03-01', '芒果娱乐网', 0),
(91, '厉害了我的歌！谷歌官方宣布Cardboard销量破千万', '百家', 'http://f12.baidu.com/it/u=736859216,3870059173&fm=170&s=E9136D974C22588250E42DDA03005032&w=640&h=360&img.JPG&access=215967316', '2017-03-01', '百家号', 0),
(92, '律政佳人，她说她能给众筹带来新的风气！', '百家', 'http://f10.baidu.com/it/u=2036529150,1082160822&fm=170&s=F2915B8716CB71559A38C3BF03008000&w=640&h=425&img.JPG&access=215967316', '2017-03-01', '百家号', 1),
(93, '聚搜营销 SEO优化手机网站的优化排名方法！', '百家', 'http://t10.baidu.com/it/u=3252897318,2114523098&fm=170&s=31A6B61AD030519240ED9DC6020030B3&w=218&h=146&img.JPEG', '2017-03-01', '百家号', 0),
(94, '刘士余不小心说漏了嘴，A股一口气要到3800！散户不赚不行了', '百家', 'http://f10.baidu.com/it/u=3983058027,1720723068&fm=170&s=8003DF14054365E942B974EA03007070&w=553&h=391&img.JPEG&access=215967316', '2017-03-01', '百家号', 0),
(95, '租场地给韩军布置“萨德“的乐天，竟然在中国有那么多产业，可能你我都消费过……', '百家', 'http://f10.baidu.com/it/u=3331116309,3325383725&fm=170&s=8D925F907068D30D13E13571030010B0&w=640&h=359&img.JPG&access=215967316', '2017-03-01', '百家号', 0),
(96, '“商改写”热潮涌现背后：商业地产步履维艰', '本地', 'http://t12.baidu.com/it/u=4099820087,2711296114&fm=170&s=C110759D5EBB6A8A204115F003008032&w=500&h=336&img.JPEG&access=215967317', '2017-03-02', '网易房产', 0),
(97, '濮存昕回应卸任北京人艺副院长：你祝贺我吧', '本地', 'http://t11.baidu.com/it/u=3720625018,2188101724&fm=170&s=D29AAB65C4436755D4247CA30100E0C2&w=465&h=601&img.JPEG&access=215967317', '2017-03-02', '台海网', 0),
(98, '共享单车火爆摩的收入腰斩地铁周边三蹦子数量锐减', '本地', 'http://t10.baidu.com/it/u=208977210,4117150579&fm=170&s=CCC27A2393810EF82E10B906030080C1&w=400&h=210&img.PNG&access=215967317', '2017-03-02', '新民网', 0),
(99, '游泳女神训练玩单杠', '推荐', 'https://t12.baidu.com/it/u=2929684952,1590480983&fm=170&s=15BD72954857E1CC40B4CDE30300A0B3&w=640&h=635&img.JPEG&access=215967317', '2017-03-02', '凤凰体育', 1),
(100, '驻新疆全国政协委员抵京', '推荐', 'https://t12.baidu.com/it/u=2275607420,1206089777&fm=170&s=C38149A856E30AA5E2B5D89203007089&w=640&h=424&img.JPEG&access=215967317', '2017-03-02', '网易新闻', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
