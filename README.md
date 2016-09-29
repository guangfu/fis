# 构建工具，基于gulp和webpack

## 安装
`npm --registry -g install kn-fis`

## 命令
在cmd中运行 `kn -h` 来获取命令帮助（我就是懒得写）                    

## 功能一览

### 创建项目

- [x] 生成项目结构

### 编译预览

- [x] npm组件化管理功能
- [x] 页面、组件html编译
- [x] mock数据注入
- [x] less 编译
- [x] CSS合并压缩
- [x] CSS autoprefix，px转rem
- [x] JS合并压缩
- [x] 自动生成雪碧图，自动多倍图
- [x] 文件内联，自定义图片转base64
- [x] 图片压缩
- [x] 字体压缩
- [x] 文件MD5戳
- [x] 本地预览
- [x] 自动刷新
- [x] 资源定位（图片等资源路径替换）
- [x] 生成项目压缩包

## 生成项目结构说明

    ├── mock                    - mock数据目录
    │   ├── ajax                - 通过ajax的mock数据目录
    |       ├── index.json      - ajax的mock文件
    │   ├── template            - 通过vm模板mock数据目录，js文件和页面vm模板文件名对应
    |       ├── index.js        - vm模板mock数据
    |
    ├── static                  - 静态资源目录
    │   ├── css                 - css目录
    │       ├── base            - 基础css目录，放置normalize以及通用类css文件
    |           ├── normalize.css- normalize文件
    |           ├── main.css    - 通用类文件
    │       ├── fonts           - 字体目录
    │       ├── mixins          - less的mixins目录
    │       ├── modules         - css模块目录
    │       ├── pages           - 页面对应的less文件
    │   ├── js                  - css目录
    │       ├── base            - 基础js目录，放置布局配置统计等通用js文件
    |           ├── config.js   - 配置文件
    |           ├── layout.js   - 布局文件
    |           ├── stat.js     - 百度和谷歌统计文件
    │       ├── bundle          - 编译后js目录
    │       ├── modules         - js模块目录
    │       ├── pages           - 页面对应的js文件
    │       ├── vendor          - 不通过npm管理的第三方模块
    |   ├── img                 - 图片目录
    |   ├── media               - 音频视频目录
    |
    ├── template                - 模板目录
    │   ├── layouts             - 布局目录
    │       ├── default.vm      - 头部和底部抽离
    │   ├── index.vm            - vm模板文件
    │  
    ├── preproduction           - 预生产目录
    |
    ├── build                   - 生产目录
    │
    ├── webacpk-config.js       - webpack配置文件
    │
    └── workpath.js             - 构建工具配置文件