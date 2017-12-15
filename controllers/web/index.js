var
expressInsatance = require('./../../express'),
express = expressInsatance.express,
app = expressInsatance.app;

// 静态资源路径
app.use('/resources', express.static('resources'));

// 加载接口相关模块
require('./model');
// 加载页面相关模块
require('./view');