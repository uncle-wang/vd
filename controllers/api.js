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

	api.addAlbum(req.query, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result);
		}
	});
});

// 获取媒体列表
app.get('/getMediaList', function(req, res) {

	api.getMediaList(function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result);
		}
	});
});

// 添加媒体
app.get('/addMedia', function(req, res) {

	api.addMedia(req.query, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result);
		}
	});
});

// 编辑媒体
app.get('/editMedia', function(req, res) {

	res.send('ok');
	api.editMedia(req.query);
});

// 获取媒体详细信息
app.get('/getMediaDetail', function(req, res) {

	api.getMediaDetail(req.query.mediaId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result[0]);
		}
	});
});