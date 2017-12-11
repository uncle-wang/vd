var
expressInsatance = require('./../express'),
express = expressInsatance.express,
app = expressInsatance.app;

var path = require('path');
var htmlPath = path.resolve(__dirname, './../views');

app

// 资源路径
.use('/resources', express.static('resources'))

// 根路径
.get('/', function(req, res) {

	res.sendFile(path.join(htmlPath, 'video.html'));
})

// 爬虫页面
.get('/cramb', function(req, res) {
	res.sendFile(path.join(htmlPath, 'cramb.html'));
});