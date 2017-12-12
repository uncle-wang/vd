var fs = require('fs');
var request = require('request');
var cdn = require('./cdn');

module.exports = function(prefix, urilist, cdnPath) {

	var pos = 0;

	var checkPos = function() {
		// 全部下载、上传完成执行回调
		if (pos >= urilist.length) {
			// 要执行的操作
		}
		// 否则执行下一次下载、上传
		else {
			downloadFile();
		}
	};

	var downloadFile = function() {

		var uriItem = urilist[pos];
		var fileName = uriItem.substring(0, uriItem.indexOf('?'));
		var url = prefix + '/' + uriItem;
		request(url, function(err, response, data) {
			if (err) {
				pos ++;
				console.log(err);
				checkPos();
			}
			else {
				if (!(parseInt(response.headers['content-length']) > 0 && data)) {
					pos ++;
					console.log('data为空');
					checkPos();
				}
				else {
					cdn(cdnPath + fileName, data, {
						option: {'Content-Type': 'video/MP2T'},
						callback: function(err) {
							if (err) {
								console.log(err);
							}
							pos ++;
							checkPos();
						}
					});
				}
			}
		});
	};

	downloadFile();
};