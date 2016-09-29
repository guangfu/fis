var path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    argv = require('yargs').argv,	//获取命令行参数
    execDir = process.cwd(),
    node_modules_dir = path.resolve(execDir, 'node_modules');

//防止webpack遍历且解析npm模块，将压缩文件引进来
//设置resolve.alias和module.noParses

//设置工作环境
var process_env = argv.process || 'dev';
var workpath = argv['content-base'] || 'app';

console.log('开发环境：', process_env)
console.log('项目名称：', workpath)

function fetchFilename(pathname) {
  return fs.existsSync(pathname) ?
    fs.readdirSync(pathname).reduce(function(obj, file) {
      obj[file.split('.')[0]] = path.resolve(pathname, file);

      return obj;
    }, {}) : {}
}

function extend(source, target) {
  return Object.keys(target).reduce(function(source, name) {
    source[name] = target[name];
    return source;
  }, source)
}

module.exports = {
  entry: extend(fetchFilename(path.resolve(workpath + "/static/js/pages")), {  }),
  output: {
    publicPath: '/static/js/bundle',
    path: path.resolve(workpath + '/static/js/bundle'),
    filename: '[name].js',
    chunkFilename: '/[name].chunk.[chunkhash].js'
  },

  externals: {  //暴露全局变量
    'jQuery': 'window.jQuery'
  },

  resolve: {
    alias: { }    //指定require引进路径，默认是node_modules的
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,  //js,react
        // exclude: [node_modules_dir],
        loader: 'babel?presets[]=es2015',
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\"' + process_env + '\"'
      }
    })
  ]

}

//开启source-map调试
if (process_env === 'dev') {
  module.exports.devtool = '#source-map';
}
