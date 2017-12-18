var db = require('./../../db');

// 获取媒体
var getMediaDetail = function(mediaId, callback) {

	var query = 'select * from MEDIA where MEDIA_ID=' + mediaId;
	db(query, function(err, result) {
		callback(err, result);
	});
};

module.exports = {
	getMediaDetail: getMediaDetail
};