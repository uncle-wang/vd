var app = require('./../../express').app;

var path = require('path');
var htmlPath = path.resolve(__dirname, './../../views/manage');

// 爬虫页面
app.get('/manage/cramb', function(req, res) {
	res.sendFile(path.join(htmlPath, 'cramb.html'));
});