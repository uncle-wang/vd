var app = require('./../../express').app;

var path = require('path');
var htmlPath = path.resolve(__dirname, './../../views/web');

// 根路径
app.get('/', function(req, res) {

	res.sendFile(path.join(htmlPath, 'video.html'));
});