var fs = require('fs');
var request = require('request');


module.exports = function(prefix, urilist, storagepath, callback) {

	var pos = 0;
	var downloadFile = function() {
		var uriItem = urilist[pos];
		var fileName = uriItem.substring(0, uriItem.indexOf('?'));
		var url = prefix + '/' + uriItem;
		request(url, function(err, response, data) {
			if (err) {
				console.log(err);
			}
			else {
				if (!(parseInt(response.headers['content-length']) > 0 && data)) {
					console.log('data为空');
				}
			}
			// 全部下载完成执行回调
			if (++ pos >= urilist.length) {
				callback();
			}
			// 否则执行下一次下载
			else {
				downloadFile();
			}
		}).pipe(fs.createWriteStream('./ts/' + storagepath + '/' + fileName));
	};
	downloadFile();
};