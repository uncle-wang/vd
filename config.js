var nodeEnv = process.env.NODE_ENV;
var mysqlConfig, awsConfig;
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
awsConfig = {
	accessKeyId: 'AKIAJCRO6HA6SDLY6NRA',
	secretAccessKey: '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',
	region: 'us-west-2',
	bucket: 'mjwts'
};
module.exports = {
	MYSQLCONFIG: mysqlConfig,
	AWSCONFIG: awsConfig
};