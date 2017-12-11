var app = require('./../express').app;
var api = require('./../api');

// 获取专辑列表
app.get('/getAlbumList', function(req, res) {

	api.getAlbumList(function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result);
		}
	});
});

// 添加专辑
app.get('/addAlbum', function(req, res) {

	var name = req.query.name;
	var flag = req.query.flag;
	var series = req.query.series;
	var cover = req.query.cover;
	var title = req.query.title;
});