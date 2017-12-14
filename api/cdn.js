var AWS = require('aws-sdk');
var AWSCONFIG = require('./../config').AWSCONFIG;
AWS.config.update(AWSCONFIG);

var getList = function(path, callback) {

	var s3 = new AWS.S3();
	s3.listObjects({
		Bucket: 'mjwts',
		Prefix: path
	}, function(err, data) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, data.Contents);
		}
	});
};

var upload = function(path, data, param) {

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

module.exports = {upload: upload, getList: getList};