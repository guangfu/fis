module.exports = build;

var fetchWebpackConfig = require('./fetchWebpackConfig.js');
var execCommand = require('./execCommand.js');
var path = require('path');
var perfectWorkpath = require('./perfectWorkpath.js');
var execDir = process.cwd();

function build(workname) {
  var workpath = path.resolve(execDir, workname);
  fetchWebpackConfig(workpath, function(config) {
    var newWorkpath = perfectWorkpath(workname);
    var gulpfile = path.resolve(__dirname, '../Gulpfile.js');
    var gulp = path.resolve(__dirname, '../node_modules/gulp/bin/gulp.js');
    var webpack = path.resolve(__dirname, '../node_modules/webpack/bin/webpack.js');

    var command = `node ${webpack} --config ${config} --process production --content-base ${workpath} && node ${gulp} build --gulpfile ${gulpfile} --workpath ${newWorkpath}`;
    execCommand(command);
  })
}
