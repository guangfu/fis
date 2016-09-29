module.exports = createProject;

var fs = require('fs');
var path = require('path');
var fse = require('fs-extra')

var execDir = process.cwd();

function createProject(workname, env) {
  var workdir = path.resolve(execDir, workname);

  if(fs.existsSync(workdir)) {
    console.log(workname + '项目目录已经存在，请检查');
    return;
  }

  var dir = (env === 'phone' ? '../boilerplate' : '../boilerplate_pc');

  fse.copySync(path.resolve(__dirname, dir), workdir)

  console.log('创建目录成功, 项目名为' + workname + '\n');
  console.log('安装项目依赖');
  console.log([' ', 'cd', workname, '&& npm install\n'].join(' '));
  console.log('运行项目');
  console.log([' ', 'kn run\n'].join(' '));
}
