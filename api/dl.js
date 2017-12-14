var request = require('request');
var cdn = require('./cdn');

module.exports = function(prefix, urilist, cdnPath, mediaId, callback) {

	var uploadPos = 0;
	var downloadPos = 0;
	var hasError = false;

	var checkUploadProcess = function() {
		// 全部上传完成执行回调
		if (uploadPos >= urilist.length) {
			if (hasError) {
				console.log('upload(' + mediaId + ') completely with error');
			}
			// 所有文件上传成功则修改媒体的发布状态
			else {
				console.log('upload(' + mediaId + ') completely without error');
				callback(mediaId);
			}
		}
	};

	var downloadFile = function() {

		var uriItem = urilist[downloadPos];
		var fileName = uriItem.substring(0, uriItem.indexOf('?'));
		var url = prefix + '/' + uriItem;
		request({url: url, encoding: null}, function(err, response, data) {
			if (err) {
				uploadPos ++;
				hasError = true;
				console.log(err);
				checkUploadProcess();
			}
			else {
				if (!(parseInt(response.headers['content-length']) > 0 && data)) {
					uploadPos ++;
					hasError = true;
					console.log('data为空');
					checkUploadProcess();
				}
				else {
					cdn(cdnPath + fileName, data, {
						option: {ContentType: 'video/MP2T'},
						callback: function(err) {
							uploadPos ++;
							if (err) {
								hasError = true;
								console.log(err);
							}
							checkUploadProcess();
						}
					});
				}
			}

			if (++ downloadPos >= urilist.length) {
				console.log('download(' + mediaId + ') completely');
			}
			else {
				downloadFile();
			}
		});
	};

	downloadFile();
};