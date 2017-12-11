var
path = require('path'),
expressInsatance = require('./express'),
express = expressInsatance.express,
app = expressInsatance.app;

var htmlPath = path.resolve(__dirname, './views');

app

// 资源路径
.use('/resources', express.static('resources'))

// 根路径
.get('/', function(req, res) {

	res.sendFile(path.join(htmlPath, 'video.html'));
})

// 404
.use(function(req, res) {

	res.status(404).send();
})

// 服务
.listen(6532, function (req, res) {

	console.log('app is running at port 6532');
});