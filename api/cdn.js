var AWS = require('aws-sdk');
var AWSCONFIG = require('./../config').AWSCONFIG;
AWS.config.update(AWSCONFIG);

module.exports = function(path, data, param) {

	var s3 = new AWS.S3();

	// s3上传配置
	var uploadOption = {

		Key: path,
		Bucket: AWSCONFIG.bucket,
		ACL: 'public-read',
		Body: data
	};

	if (param && param.option) {
		for (var key in param.option) {
			uploadOption[key] = param.option[key];
		}
	}

	s3.upload(uploadOption, function(err, data) {

		// 结果传给回调函数
		if (param && param.callback) {
			param.callback(err, data);
		}
	});
};