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
			res.redirect('/manage/albums');
		}
	});
});

// 编辑专辑
app.get('/manage/api/editAlbum', function(req, res) {

	api.editAlbum(req.query, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
		}
	});
});

// 删除专辑
app.get('/manage/api/removeAlbum', function(req, res) {

	var albumId = req.query.album_id;
	api.removeAlbum(albumId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
		}
	});
});

// 发布专辑
app.get('/manage/api/publishAlbum', function(req, res) {

	var albumId = req.query.album_id;
	api.publishAlbum(albumId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
		}
	});
});

// 下架专辑
app.get('/manage/api/unpublishAlbum', function(req, res) {

	var albumId = req.query.album_id;
	api.unpublishAlbum(albumId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
		}
	});
});

// 专辑置完结
app.get('/manage/api/overAlbum', function(req, res) {

	var albumId = req.query.album_id;
	api.overAlbum(albumId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
		}
	});
});

// 专辑置未完结
app.get('/manage/api/unoverAlbum', function(req, res) {

	var albumId = req.query.album_id;
	api.unoverAlbum(albumId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/albums');
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

	api.editMedia(req.query, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/medias?media_type=' + req.query.type);
		}
	});
});

// 删除媒体
app.get('/manage/api/removeMedia', function(req, res) {

	var mediaId = req.query.media_id;
	api.removeMedia(mediaId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/medias');
		}
	});
});

// 发布媒体
app.get('/manage/api/publishMedia', function(req, res) {

	var mediaId = req.query.media_id;
	api.publishMedia(mediaId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/medias');
		}
	});
});

// 下架媒体
app.get('/manage/api/unpublishMedia', function(req, res) {

	var mediaId = req.query.media_id;
	api.unpublishMedia(mediaId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.redirect('/manage/medias');
		}
	});
});