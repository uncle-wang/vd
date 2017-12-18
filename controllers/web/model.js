var app = require('./../../express').app;
var api = require('./../../module/api/web');

// 获取媒体详细信息
app.get('/api/getMediaDetail', function(req, res) {

	api.getMediaDetail(req.query.mediaId, function(err, result) {
		if (err) {
			res.send(err);
		}
		else {
			res.send(result[0]);
		}
	});
});