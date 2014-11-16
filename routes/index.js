var express = require('express');
var router = express.Router();
var superagent = require('superagent');
var cheerio = require('cheerio');
var utility = require('utility');

router.get('/', function(req, res) {
	res.send('success connect to gismanli!');
})

router.post('/api/login', function(req, res) {
	var schoolcode = "10533";
	var x = utility.md5(req.body.username + utility.md5(req.body.password).substring(0, 30).toUpperCase() + schoolcode).substring(0, 30).toUpperCase();
	var y = utility.md5(utility.md5(req.body.code).substring(0, 30).toUpperCase() + schoolcode).substring(0, 30).toUpperCase();
	superagent.post('http://csujwc.its.csu.edu.cn/_data/index_login.aspx').set('Cookie', 'ASP.NET_SessionId=' + req.body.cookie).send({
		__VIEWSTATE: req.query.state,
		Sel_Type: 'STU',
		UserID: req.body.username,
		PassWord: req.body.password,
		cCode: req.body.code,
		typeName: '学生',
		sdfdfdhgwerewt: x,
		cxfdsfdshjhjlk: y
	}).end(function(err, rs) {
		if (err) return next(err);
		res.set('Content-Type', 'text/html');
		res.send(rs);
	});
});

router.get('/api/waimai', function(req, res) {
	superagent.get('http://ele.me/place/2d8caded09e1').end(function(err, rs) {
		if (err) return next(err);
		var $ = cheerio.load(rs.text);
		var items = [];
		$('.restaurant-list-table tbody .line-one .logo .restaurant-logo').each(function(idx, element) {
			console.log(idx);
			var $element = $(element);
			items.push({
				title: $element.attr('alt'),
				href: $($element.parents('.line-one').find('.logo').find('a')).attr('href'),
				img: $element.attr('src')
			});
		});
		res.send(items);
	});
});

router.get('/api/goods', function(req, res) {
	superagent.get('http://tieba.baidu.com/f?kw=%E4%B8%AD%E5%8D%97%E5%A4%A7%E5%AD%A6').end(function(err, sres) {
		if (err) return next(err);
		var $ = cheerio.load(sres.text);
		var items = [];
		$('#thread_list .j_thread_list.clearfix .threadlist_lz.clearfix .threadlist_text.threadlist_title.j_th_tit a').each(function(idx, element) {
			var $element = $(element);
			var $a = $($(element).parents('.threadlist_lz.clearfix').find('.threadlist_author').find('span').find('a'));
			items.push({
				title: $element.attr('title'),
				href: 'http://tieba.baidu.com' + $element.attr('href'),
				nickname: $a.text()
			});
		});
		res.send(items);
	})
});

router.get('/api/waimai/detail',function(req,res){
	superagent.get(req.query.http).end(function(err, sres) {
		if (err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		$('.rst-menu-list li .rst-d-main .rst-d-name.food_name').each(function(idx, element) {
			var $element = $(element);
			items.push({
				title: $element.attr('title'),
				price: $element.attr('title')
			});
		});
		res.send(items);
	});
})

router.get('/api/news', function(req, res) {
	superagent.get('http://news.its.csu.edu.cn/newsarticlelist?fetchkey=' + req.query.key).end(function(err, sres) {
		if (err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		$('.mt-leftnr ul li a').each(function(idx, element) {
			var $element = $(element);
			items.push({
				title: $element.attr('title'),
				href: 'http://news.its.csu.edu.cn/' + $element.attr('href')
			});
		});
		res.send(items);
	});
});
module.exports = router;

