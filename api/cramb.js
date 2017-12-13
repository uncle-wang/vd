var request = require('request');
var cdn = require('./cdn');
var dl = require('./dl');

var cdnPrefix = 'ts/';

var cramb = function(param, mediaId, callback) {

	var start = 0;
	var listUrl = param.cramb_url;
	var fileUrlPre = listUrl.substring(0, listUrl.lastIndexOf('/'));
	var listFileName = listUrl.substring(listUrl.lastIndexOf('/') + 1, listUrl.lastIndexOf('?'));
	var cdnPath = Math.floor(mediaId / 50) + '/' + mediaId + '/';
	if (param.start_point) {
		start = parseInt(param.start_point);
	}
	request(listUrl, function(err, response, data) {
		if (err) {
			console.log(err);
			return;
		}
		if (data) {
			// 上传文件
			cdn(cdnPath + listFileName, data, {
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
			var temArr = data.split('\n');
			var fileUrls = [];
			temArr.forEach(function(lineText) {
				if (lineText && lineText[0] !== '#') {
					fileUrls.push(lineText);
				}				
			});
			fileUrls = fileUrls.slice(start);
			if (fileUrls.length > 0) {
				dl(fileUrlPre, fileUrls, cdnPath, mediaId, callback);
			}
		}
	});
};

module.exports = cramb;