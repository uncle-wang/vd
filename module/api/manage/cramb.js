var request = require('request');
var cdn = require('./cdn');
var dl = require('./dl');

var _fileExistInCdn = function(temUrl, uriList) {

	var temFileName = temUrl.substring(0, temUrl.indexOf('?'));
	for (var i = 0; i < uriList.length; i ++) {
		var key = uriList[i].Key;
		var cdnFileName = key.substr(key.lastIndexOf('/') + 1);
		if (temFileName === cdnFileName) {
			return true;
		}
	}
	return false;
};

var cramb = function(listUrl, mediaId, callback) {

	var fileUrlPre = listUrl.substring(0, listUrl.lastIndexOf('/'));
	var listFileName = listUrl.substring(listUrl.lastIndexOf('/') + 1, listUrl.lastIndexOf('?'));
	var cdnPath = Math.floor(mediaId / 50) + '/' + mediaId + '/';
	request(listUrl, function(err, response, data) {
		if (err) {
			console.log(err);
			return;
		}
		if (data) {
			// 上传文件
			cdn.upload(cdnPath + listFileName, data, {
				option: {ContentType: 'application/vnd.apple.mpegurl'},
				callback: function(err) {
					if (err) {
						console.log(err);
					}
					else {
						console.log('ok: ' + listFileName);
					}
				}
			});
			// 读取m3u8文件
			var temArr = data.split('\n');
			var temUrls = [];
			// 提取文件信息
			temArr.forEach(function(lineText) {
				if (lineText && lineText[0] !== '#') {
					temUrls.push(lineText);
				}				
			});
			// 读取cdn中的文件列表做缺失匹配
			cdn.getList(cdnPath, function(err, fileList) {
				if (err) {
					console.log('get list from cdn failed', err);
					return;
				}
				var fileUrls = [];
				// 如果cdn列表中没有该文件，则添加到爬取列表中
				temUrls.forEach(function(temUrl) {
					if (!_fileExistInCdn(temUrl, fileList)) {
						fileUrls.push(temUrl);
					}
				});
				if (fileUrls.length > 0) {
					console.log(mediaId + ' - ' + fileUrls.length + ' files');
					dl(fileUrlPre, fileUrls, cdnPath, mediaId, callback);
				}
			});
		}
	});
};

module.exports = cramb;