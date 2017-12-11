var db = require('./db');

// 获取专辑列表
var getAlbumList = function(callback) {

	var query = 'select * from ALBUM order by ALBUM_CREATE_TIME desc';
	db(query, function(err, result) {
		callback(err, result);
	});
};

module.exports = {getAlbumList: getAlbumList};