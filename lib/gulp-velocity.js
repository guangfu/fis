var through = require('through2');
var PluginError = require('gulp-util').PluginError;
var fs = require('fs');
var path = require('path');
var Velocity = require('velocityjs');
var Compile = Velocity.Compile;
// var execDir = process.cwd();

var PLUGIN_NAME = 'gulp-velocity.js';

var titleReg = /\<title\>([^]*)\<\/title\>/i;
var headReg = /\<head\>([^]*)\<\/head\>/i;
var bodyReg = /\<body\>([^]*)\<\/body\>/i;

var definedMacros = {
  includeBase: '',
  include(filename) {
    try {
      filename = /\/WEB-INF\/(.*)/gi.exec(filename)[1];
    } catch(e) {

    }
    filename = path.resolve(this.includeBase, filename);
    return fs.readFileSync(filename).toString();
  },
  parse(filename) {
    try {
      filename = /\/WEB-INF\/(.*)/gi.exec(filename)[1];
    } catch(e) {

    }
    filename = path.resolve(this.includeBase, filename);
    return this.eval(fs.readFileSync(filename).toString());
  }
}

//options { default: '', mock: '', includeBase: ''}
module.exports = function(options) {
  var defaultVm = fs.readFileSync(options.default).toString();

  return through.obj(function(file, encoding, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'doesn\'t support Streams'));
    }

    definedMacros.includeBase = options.includeBase;

    var prefix = file.path.split('\\').pop().split('.vm')[0];
    var mockPath = path.resolve(options.mock, prefix + '.js');
    try {
      var mockData = require(mockPath);
      delete require.cache[mockPath];  //删除require缓存
    } catch(e) {
      var mockData = {};
    }

    // var str = Velocity.render(file.contents.toString(), mockData, definedMacros);
    var asts = Velocity.parse(file.contents.toString());
    var str = (new Compile(asts, {escape: false})).render(mockData, definedMacros);
    var title = titleReg.exec(str)[1];
    var head = headReg.exec(str)[1];
    var body = bodyReg.exec(str)[1];

    var defaultHtml = defaultVm.replace('$title', title).replace('$head', head).replace('$body', body);
    // var html = Velocity.render(defaultHtml, mockData, definedMacros);
    asts = Velocity.parse(defaultHtml);
    var html = (new Compile(asts, {escape: false})).render(mockData, definedMacros);

    file.contents = new Buffer(html);

    return cb(null, file);

  });
}
