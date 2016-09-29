module.exports = execCommand;

var exec = require('child_process').exec;

//执行shell命令
function execCommand(command) {
  var server = exec(command);

  server.stdout.on('data', (data) => {
    process.stdout.write(`${data}`)
  });
  server.stderr.on('data', (data) => {
    process.stdout.write(`${data}`);
  });
  server.on('close', (code) => {
    process.stdout.write(`child process exited with code ${code}`);
  });
}
