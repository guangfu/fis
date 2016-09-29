#!/usr/bin/env node

// 调用方式：
// 1、kn init workname 新建项目目录
// 2、kn run workname 启动项目
// 3、kn test workname 打包测试环境项目
// 4、kn build workname 打包生成环境项目
// 5、kn deploy workname 将项目分发到线上

var yargs = require('yargs');

var argv = yargs
  .usage('Usage: kn <command> <workname> [options]')
  .command('init', '新建手机项目目录')
  .command('init-pc', '新建PC项目目录')
  .command('run', '启动项目')
  .command('test', '打包测试环境项目')
  .command('build', '打包生成环境项目')
  .command('deploy', '将项目分发到线上')
  .command('new', '新建页面')
  .demand(1)
  .example('kn init workname', '新建项目目录')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2016')
  .argv;

var command = argv._[0];
var workname = argv._[1];


switch (command) {
  case 'init':
    if (!workname) {
      console.log('缺少项目目录名');
      return;
    }
    var init = require('./lib/init.js');
  
    init(workname, 'phone');
    break;

  case 'init-pc':
    var init = require('./lib/init.js');
    if (!workname) {
      console.log('缺少项目目录名');
      return;
    }
    init(workname, 'pc');
    break;

  case 'run':
    var run = require('./lib/run.js');

    run(workname || '');
    break;
  case 'test':
    var test = require('./lib/test.js');

    test(workname || '');

    break;
  case 'build':
    var build = require('./lib/build.js');

    build(workname || '');
    break;
  case 'deploy':
    var deploy = require('./lib/deploy.js');

    deploy(workname);
    break;
  case 'new':
    if (!workname) {
      console.log('缺少新建页面名');
      return;
    }
    var newPage = require('./lib/newPage.js');

    newPage(workname);
    break;
  default:
    console.log(command, 'command不存在');
}
