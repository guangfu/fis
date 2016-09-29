module.exports = fetch;

var path = require('path');
var fs = require('fs');
var execDir = process.cwd();

// 判断是否有自定义webpack.config.js配置文件
function fetch(workname, cb) {
  //判断是否有自定义webpack.config.js配置文件，启动webpack-dev-server
  fs.stat(path.resolve(execDir, workname, 'webpack.config.js'), function(err, stat) {
    var webpackConfig;
    if (err && err.code == 'ENOENT') {
      webpackConfig = path.resolve(__dirname, '../webpack.config.js')
    } else {
      webpackConfig = path.resolve(execDir, workname, 'webpack.config.js');
    }

    cb(webpackConfig);
  })
}
