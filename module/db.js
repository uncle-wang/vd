var mysql = require('mysql');
var config = require('./../config').MYSQLCONFIG;
var pool  = mysql.createPool(config);

module.exports = function(query, callback) {

	// 创建连接
	pool.getConnection(function(err, connection) {
		// 连接出错，返回给回调函数
		if (err) {
			callback(err);
			return;
		}
		// 执行sql语句
		connection.query(query, function(queryerr, results) {
			// 执行完毕后关闭连接
			connection.release();
			// 如果执行出错，返回给回调函数
			if (queryerr) {
				callback(queryerr);
				return;
			}
			// 返回结果
			callback(null, results);
		});
	});
};