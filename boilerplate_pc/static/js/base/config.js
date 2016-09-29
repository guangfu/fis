/**
 * 接口配置文件
 */

var config = {

}

Object.keys(config).forEach((key) => {
  if (process.env.NODE_ENV === 'production')
    config[key] = config[key];

  if (process.env.NODE_ENV === 'dev')
    config[key] = config[key];

  if (process.env.NODE_ENV === 'test')
    config[key] = config[key];
})


export default config;
