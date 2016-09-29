var gulp = require('gulp');
var fs = require('fs');
var argv = require('yargs').argv;	//获取命令行参数
var runSequence = require('run-sequence');  //顺序执行
var util = require('./gulp-util.js');
var browserSync = require('browser-sync').create();
var chokidar = require('chokidar');

// var workpath = fs.readFileSync(argv.workpath || 'workpath-abs.json', 'utf8')
// console.log(JSON.parse(workpath));
var workpath = JSON.parse(fs.readFileSync(argv.workpath || 'workpath-abs.json', 'utf8'));	//配置路径
console.log('启动的项目路径：', workpath.dev.path);
// function clone(source) {
//   return Object.keys(source).reduce((obj, name) => {
//     obj[name] = typeof source[name] === 'object' ? clone(source[name]) : source[name];
//     return obj;
//   }, {})
// }

//打包之前先编译一次less文件
gulp.task('build-less', () => {
  return util.less(workpath.dev.less);
})

//打包之前先编译下vm文件
gulp.task('build-velocity', () => {
  return util.velocity(workpath.dev.velocity);
})

//清除相关目录
gulp.task('build-clean', () => {
  return util.clean(workpath.build.clean);
});

//清除manifest文件
gulp.task('build-clean-manifest', () => {
  return util.clean('rev-manifest.json');
})

//处理图片
gulp.task('build-image', () => {
  return util.compileImages(workpath.build.image);
})

//处理js
gulp.task('build-js', () => {
  return util.compileJs(workpath.build.js);
})

//处理css
gulp.task('build-css', () => {
  return util.compileCss(workpath.build.css);
})

//复制静态文件
gulp.task('build-duplicate-static', () => {
  return util.duplicateStatic(workpath.build.statics);
})

//base64图片内嵌
gulp.task('build-base64', () => {
  return util.Base64(workpath.build.base64);
})

//编译html文件
gulp.task('build-html', () => {
  return util.compileHtml(workpath.build.html);
})

//编译vm文件
gulp.task('build-vm', () => {
  if (workpath.build.velocity) {
    return util.compileVm(workpath.build.velocity);
  }
})

//打包成zip文件
gulp.task('build-zip', () => {
  return util.zip(workpath.build.zip);
})

gulp.task('browserSync', () => {
  browserSync.init({
    // server: workpath.path,
    proxy: "localhost:8080"
  });
})

//监控并编译less文件
gulp.task('dev-less', function() {
  util.less(workpath.dev.less);

  // gulp.watch(workpath.dev.less.watch, function(event) {
  //   var filename = event.path;
  //   console.log(filename + '文件改变了');
  //   util.less(workpath.dev.less);
  // }).on('change', browserSync.reload);
  chokidar.watch(workpath.dev.less.watch).on('change', function(filename) {
    console.log(filename + '文件改变了');
    util.less(workpath.dev.less);
    browserSync.reload();
  })
});

//合并模板文件
gulp.task('dev-velocity', () => {
  util.velocity(workpath.dev.velocity);

  // gulp.watch(workpath.dev.velocity.watch, function(event) {
  //   var filename = event.path;
  //   console.log(filename + '文件改变了');
  //   util.velocity(workpath.dev.velocity);
  // }).on('change', browserSync.reload);
  chokidar.watch(workpath.dev.velocity.watch).on('change', function(filename) {
    console.log(filename + '文件改变了');
    util.velocity(workpath.dev.velocity);
    browserSync.reload();
  })
})

gulp.task('test-clean', () => {
  return util.clean(workpath.test.clean);
})

gulp.task('test-duplicate-static', () => {
  return util.duplicateStatic(workpath.test.statics);
})

//打包成zip文件
gulp.task('test-zip', () => {
  return util.zip(workpath.test.zip);
})

//一键启动，包括less文件编译，模板文件合并，文件修改编译等等
gulp.task('dev', ['browserSync', 'dev-less', 'dev-velocity'])

//一键打包到测试目录
gulp.task('test', () => {
  runSequence(['build-less', 'build-velocity', 'test-clean'],
               'test-duplicate-static',
               'test-zip');
})

//一键编译打包到生产环境
gulp.task('build', () => {
  runSequence(['build-less', 'build-velocity', 'build-clean', 'build-clean-manifest'],
              ['build-image', 'build-css', 'build-duplicate-static'],
              'build-base64',
              'build-js',
              ['build-html', 'build-vm'],
              'build-zip');
})
