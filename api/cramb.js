var request = require('request');
var cdn = require('./cdn');
var dl = require('./dl');

var cdnPrefix = 'ts/';

var cramb = function(param, mediaId) {

	var cdnPath;
	var listUrl = param.cramb_url;
	var fileUrlPre = listUrl.substring(0, listUrl.lastIndexOf('/'));
	var listFileName = listUrl.substring(listUrl.lastIndexOf('/') + 1, listUrl.lastIndexOf('?'));
	if (param.type == 1) {
		cdnPath = cdnPrefix + 'album/' + param.album + '/' + param.album_index + '/' + mediaId + '/';
	}
	else {
		cdnPath = cdnPrefix + 'single/' + mediaId + '/';
	}
	request(listUrl, function(err, response, data) {
		if (err) {
			console.log(err);
			return;
		}
		if (data) {
			// 上传文件
			cdn(cdnPath + listFileName, data);
			var temArr = data.split('\n');
			var fileUrls = [];
			temArr.forEach(function(lineText) {
				if (lineText && lineText[0] !== '#') {
					fileUrls.push(lineText);
				}
			});
			if (fileUrls.length > 0) {
				dl(fileUrlPre, fileUrls, cdnPath, function() {
					console.log('ok');
				});
			}
		}
	});
};

module.exports = cramb;