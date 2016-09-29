module.exports = run;

var path = require('path');
var fs = require('fs');
var execCommand = require('./execCommand.js');
var fetchWebpackConfig = require('./fetchWebpackConfig.js');
var perfectWorkpath = require('./perfectWorkpath.js');
var execDir = process.cwd();

function run(workname) {
  //获取webpack.config文件，并启动webpack-dev-server
  fetchWebpackConfig(workname, function(config) {
    workname = path.resolve(execDir, workname);
    var webpackDevServer = path.resolve(__dirname, '../node_modules/webpack-dev-server/bin/webpack-dev-server.js');
    var command = `node ${webpackDevServer} --config ${config} --progress --hot --inline --colors --content-base ${workname}`;
    execCommand(command);
  })

  //获取workpath路径
  var newWorkpath = perfectWorkpath(workname);
  var gulpfile = path.resolve(__dirname, '../Gulpfile.js');
  var gulp = path.resolve(__dirname, '../node_modules/gulp/bin/gulp.js');
  var command = `node ${gulp} dev --gulpfile ${gulpfile} --workpath ${newWorkpath}`
  execCommand(command);

}
