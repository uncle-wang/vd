var app = require('./../../express').app;
var api = require('./../../module/api/manage');

// 获取专辑列表
app.get('/manage/api/getAlbumList', function(req, res) {

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
app.get('/manage/api/addAlbum', function(req, res) {

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
app.get('/manage/api/getMediaList', function(req, res) {

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
app.get('/manage/api/addMedia', function(req, res) {

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
app.get('/manage/api/editMedia', function(req, res) {

	res.send('ok');
	api.editMedia(req.query);
});