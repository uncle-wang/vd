var expressIns = require('./../express'), express = expressIns.express, app = expressIns.app;
var request = require('request');
var dl = require('./dl');

app.get('/cramb', function(req, res) {
	
	var listUrl = req.query.list_url;
	var fileUrlPre = listUrl.substring(0, listUrl.lastIndexOf('/'));
	request(listUrl, function(err, response, data) {
		if (err) {
			console.log(err);
			res.send(err);
			return;
		}
		if (data) {
			var temArr = data.split('\n');
			var fileUrls = [];
			temArr.forEach(function(lineText) {
				if (lineText && lineText[0] !== '#') {
					fileUrls.push(lineText);
				}
			});
			if (fileUrls.length > 0) {
				res.send('ok');
				dl(fileUrlPre, fileUrls, 'fff', function() {
					console.log('ok');
				});
				return;
			}
		}
		res.send('data错误');
	});
});