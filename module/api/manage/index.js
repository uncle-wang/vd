var db = require('./../../db');
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
	var length = param.length;
	var cover = param.cover;
	var title = param.title;
	var keys, values;

	keys = 'ALBUM_NAME,ALBUM_STATUS,ALBUM_PUBLISHED,ALBUM_LENGTH';
	values = '"' + name + '",0,0,' + length;
	if (cover) {
		keys += ',ALBUM_COVER';
		values = values + ',"' + cover + '"';
	}
	if (title) {
		keys += ',ALBUM_TITLE';
		values = values + ',"' + title + '"';
	}

	var query = 'INSERT INTO ALBUM(' + keys + ') VALUES(' + values + ')';
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 编辑专辑
var editAlbum = function(param, callback) {

	var keys = 'ALBUM_NAME="' + param.name + '",ALBUM_LENGTH=' + param.length;
	if (param.cover) {
		keys = keys + ',ALBUM_COVER="' + param.cover + '"';
	}
	if (param.title) {
		keys = keys + ',ALBUM_TITLE="' + param.title + '"';
	}
	var query = 'update ALBUM set ' + keys + ' where ALBUM_ID=' + param.album_id;
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 删除专辑
var removeAlbum = function(albumId, callback) {

	db('delete from ALBUM where ALBUM_ID=' + albumId, function(err, result) {
		callback(err, result);
	});
};

// 发布专辑
var publishAlbum = function(albumId, callback) {

	db('update ALBUM set ALBUM_PUBLISHED=1 where ALBUM_ID=' + albumId, function(err, result) {
		callback(err, result);
	});
};

// 下架专辑
var unpublishAlbum = function(albumId, callback) {

	db('update ALBUM set ALBUM_PUBLISHED=0 where ALBUM_ID=' + albumId, function(err, result) {
		callback(err, result);
	});
};

// 专辑置完结
var overAlbum = function(albumId, callback) {

	db('update ALBUM set ALBUM_STATUS=1 where ALBUM_ID=' + albumId, function(err, result) {
		callback(err, result);
	});
};

// 专辑置未完结
var unoverAlbum = function(albumId, callback) {

	db('update ALBUM set ALBUM_STATUS=0 where ALBUM_ID=' + albumId, function(err, result) {
		callback(err, result);
	});
};

// 获取媒体列表
var getMediaList = function(callback) {

	var query = 'select * from MEDIA order by MEDIA_ALBUM,MEDIA_ALBUM_INDEX';
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 添加媒体
var addMedia = function(param, callback) {

	var playFileName = param.cramb_url.substring(param.cramb_url.lastIndexOf('/') + 1, param.cramb_url.lastIndexOf('?'))
	var keys, values;
	keys = 'MEDIA_TYPE,MEDIA_PUBLISHED,MEDIA_PLAYLIST';
	values = param.type + ',0,"' + playFileName + '"';
	// 无专辑
	if (param.type == 0) {
		keys += ',MEDIA_NAME';
		values = values + ',"' + param.name + '"';
	}
	// 有专辑
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
				cramb(param.cramb_url, result.insertId, _publishMedia);
			}
		}
	});
};

// 编辑媒体
var editMedia = function(param, callback) {

	var keys;
	if (parseInt(param.type) === 0) {
		keys = 'MEDIA_NAME="' + param.name + '"';
	}
	else {
		keys = 'MEDIA_ALBUM=' + param.album + ',MEDIA_ALBUM_INDEX=' + param.album_index;
	}
	if (param.cover) {
		keys = keys + ',MEDIA_COVER="' + param.cover + '"';
	}
	if (param.title) {
		keys = keys + ',MEDIA_TITLE="' + param.title + '"';
	}
	var query = 'update MEDIA set ' + keys + ' where MEDIA_ID=' + param.media_id;
	db(query, function(err, result) {
		callback(err, result);
	});
};

// 删除专辑
var removeMedia = function(mediaId, callback) {

	db('delete from MEDIA where MEDIA_ID=' + mediaId, function(err, result) {
		callback(err, result);
	});
};

// 发布专辑
var publishMedia = function(mediaId, callback) {

	db('update MEDIA set MEDIA_PUBLISHED=1 where MEDIA_ID=' + mediaId, function(err, result) {
		callback(err, result);
	});
};

// 下架专辑
var unpublishMedia = function(mediaId, callback) {

	db('update MEDIA set MEDIA_PUBLISHED=0 where MEDIA_ID=' + mediaId, function(err, result) {
		callback(err, result);
	});
};

// 编辑媒体
var editMedia2 = function(param) {

	cramb(param.cramb_url, parseInt(param.media_id), _publishMedia);
};

// 发布媒体
var _publishMedia = function(mediaId) {

	var query = 'update MEDIA set MEDIA_PUBLISHED=1 where MEDIA_ID=' + mediaId;
	db(query, function(err, result) {
		if (err) {
			console.log('publish media(' + mediaId + ') error', err);
		}
		else {
			console.log('publish media(' + mediaId + ') successfully');
		}
	});
};

module.exports = {
	getAlbumList: getAlbumList,
	addAlbum: addAlbum,
	editAlbum: editAlbum,
	removeAlbum: removeAlbum,
	publishAlbum: publishAlbum,
	unpublishAlbum: unpublishAlbum,
	overAlbum: overAlbum,
	unoverAlbum: unoverAlbum,
	getMediaList: getMediaList,
	addMedia: addMedia,
	editMedia: editMedia,
	removeMedia: removeMedia,
	publishMedia: publishMedia,
	unpublishMedia: unpublishMedia
};