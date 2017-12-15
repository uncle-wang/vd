var app = require('./express').app;

// 加载后台管理模块
require('./controllers/manage');
// 加载web站模块
require('./controllers/web');

app

// 404
.use(function(req, res) {

	res.status(404).send();
})

// 服务
.listen(6532, function (req, res) {

	console.log('app is running at port 6532');
});