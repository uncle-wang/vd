var db = require('./db');
var cramb = require('./cramb');

// 获取专辑列表
var getAlbumList = function(callback) {

	var query = 'select * from ALBUM order by ALBUM_CREATE_TIME desc';
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 添加专辑
var addAlbum = function(param, callback) {

	var name = param.name;
	var cover = param.cover;
	var title = param.title;
	var flag = param.flag;
	var series = param.series;
	var keys, values;

	keys = 'ALBUM_NAME,ALBUM_STATUS,ALBUM_PUBLISHED';
	values = '"' + name + '",0,0';
	if (cover) {
		keys += ',ALBUM_COVER';
		values = values + ',"' + cover + '"';
	}
	if (title) {
		keys += ',ALBUM_TITLE';
		values = values + ',"' + title + '"';
	}
	// 如果专辑是带序列的
	if (flag) {
		keys += ',ALBUM_FLAG,ALBUM_SERIES';
		values = values + ',1,' + series;
	}
	else {
		keys += ',ALBUM_FLAG';
		values += ',0';
	}

	var query = 'INSERT INTO ALBUM(' + keys + ') VALUES(' + values + ')';
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 获取媒体列表
var getMediaList = function(callback) {

	var query = 'select * from MEDIA order by MEDIA_CREATE_TIME desc';
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 添加媒体
var addMedia = function(param, callback) {

	var keys, values;
	keys = 'MEDIA_TYPE,MEDIA_PUBLISHED';
	values = param.type + ',0';
	if (param.type == 0) {
		keys += ',MEDIA_NAME';
		values = values + ',"' + param.name + '"';
	}
	else {
		keys += ',MEDIA_ALBUM,MEDIA_ALBUM_INDEX';
		values = values + ',' + param.album + ',' + param.album_index;
	}
	if (param.cover) {
		keys += ',MEDIA_COVER';
		values = values + ',"' + param.cover + '"';
	}
	if (param.title) {
		keys += ',MEDIA_TITLE';
		values = values + ',"' + param.title + '"';
	}
	var query = 'INSERT INTO MEDIA(' + keys + ') VALUES(' + values + ')';
	db(query, function(err, result) {
		callback(err, result);
		if (!err) {
			if (result && result.affectedRows == 1) {
				cramb(param, result.insertId);
			}
		}
	});
};

module.exports = {
	getAlbumList: getAlbumList,
	addAlbum: addAlbum,
	getMediaList: getMediaList,
	addMedia: addMedia
};