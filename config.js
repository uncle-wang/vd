var nodeEnv = process.env.NODE_ENV;
var mysqlConfig, awsConfig;
if (nodeEnv === 'production') {
	mysqlConfig = {
		host: '172.17.0.2',
		user: 'root',
		password: 'admin',
		database: 'vd'
	};
}
else if (nodeEnv === 'test') {
	mysqlConfig = {
		host: '172.17.0.2',
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
	accessKeyId: 'AKIAJWMUBT3U6TBWGEEQ',
	secretAccessKey: '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',
	region: 'us-west-2',
	bucket: 'mjwts'
};
module.exports = {
	MYSQLCONFIG: mysqlConfig,
	AWSCONFIG: awsConfig
};