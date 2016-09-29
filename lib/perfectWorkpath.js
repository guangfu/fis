var path = require('path');
var fs = require('fs');
var execDir = process.cwd();

module.exports = perfectWorkpath;

function perfectWorkpath(workname) {
  workname = workname || '';
  // 获取项目下的workpath.js配置文件
  var workpath = require(path.resolve(execDir, workname, 'workpath.js'));
  var newWorkpath = path.resolve(__dirname, '../workpath/' + workname + '-workpath.json')
  fs.writeFileSync(newWorkpath, JSON.stringify(handle(workname, workpath), null, 4));

  return newWorkpath;
}

/**
 * 将路径配置文件转化为绝对路径
 * @param  {string} workname 项目名
 * @param  {string} workpath 路径配置格式
 * @return {object}          修改后的配置格式
 */
function handle(workname, workpath) {

  if (Object.prototype.toString.call(workpath) === '[object Object]') {
    for (var name in workpath) {
      workpath[name] = handle(workname, workpath[name]);
    }

    return workpath;
  }

  if (Object.prototype.toString.call(workpath) === '[object Array]') {
    workpath.forEach(function(item, index) {
      workpath[index] = handle(workname, item);
    })

    return workpath;
  }

  if (Object.prototype.toString.call(workpath) === '[object String]') {
    return workpath.replace(/\{path\}/g, path.resolve(execDir, workname));
  }

  return workpath;

}
