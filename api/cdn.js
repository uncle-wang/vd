var AWS = require('aws-sdk');
var AWSCONFIG = require('./../config').AWSCONFIG;
AWS.config.update(AWSCONFIG);

module.exports = function(path, data, callback) {

	var s3 = new AWS.S3();

	// s3上传配置
	var uploadOption = {

		Key: path,
		Bucket: AWSCONFIG.bucket,
		ACL: 'public-read',
		Body: data
	};

	s3.upload(uploadOption, function(err, data) {

		// 结果写入result结果集
		if (err) {
			console.log(err);
		}
		else {
			if (callback) {
				callback();
			}
		}
	});
};