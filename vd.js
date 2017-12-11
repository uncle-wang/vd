var expressInsatance = require('./express').app;

app

// 404
.use(function(req, res) {

	res.status(404).send();
})

// 服务
.listen(6532, function (req, res) {

	console.log('app is running at port 6532');
});