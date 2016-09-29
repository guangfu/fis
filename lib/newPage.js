module.exports = createNewPage;

var fse = require('fs-extra')
var path = require('path');
var execDir = process.cwd();

function createNewPage(filename) {
  var jsDir = path.resolve(execDir, 'static/js/pages', filename + '.js');
  var cssDir = path.resolve(execDir, 'static/css/pages', filename + '.less');
  var vmDir = path.resolve(execDir, 'template', filename + '.vm');

  var vm = fse.readFileSync(path.resolve(__dirname, '../page_boilerplate/index.vm'), 'utf8').replace(/\{filename\}/ig, filename);
  var css = fse.readFileSync(path.resolve(__dirname, '../page_boilerplate/index.css'), 'utf8');
  var js = fse.readFileSync(path.resolve(__dirname, '../page_boilerplate/index.js'), 'utf8');
  
  fse.writeFileSync(vmDir, vm);
  fse.writeFileSync(cssDir, css);
  fse.writeFileSync(jsDir, js);

  console.log(`创建${filename}成功`);
}
