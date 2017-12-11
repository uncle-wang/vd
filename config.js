var nodeEnv = process.env.NODE_ENV;
var mysqlConfig;
if (nodeEnv === 'production') {
	mysqlConfig = {
		host: 'localhost',
		user: 'root',
		password: 'admin',
		database: 'vd'
	};
}
else if (nodeEnv === 'test') {
	mysqlConfig = {
		host: 'localhost',
		user: 'root',
		password: 'admin',
		database: 'vd_test'
	};
}
else {
	mysqlConfig = {
		host: '52.38.201.172',
		user: 'root',
		password: 'admin',
		database: 'vd_test'
	};
}
module.exports.MYSQLCONFIG = mysqlConfig;