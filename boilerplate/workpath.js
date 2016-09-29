// //项目的工作配置路径
module.exports = {
  //开发环境
  dev: {
    path: '{path}',  //项目目录
    less: {
      "watch": "{path}/static/css/**/*.less",
      "source": "{path}/static/css/pages/*.less",
      "build": "{path}/static/css/pages",
      "pxtorem": {
        isUse: true,
        rootValue: 64,
        propWhiteList: []
      }
    },
    velocity: {
      "watch": ["{path}/mock/template/*.js", "{path}/template/**/*.vm"],
      "default": "{path}/template/layouts/default.vm",
      "mock": "{path}/mock/template",
      "includeBase": "{path}/template",
      "source": "{path}/template/*.vm",
      "build": "{path}/"
    }
  },
  //测试环境
  test: {
    path: '{path}/preproduction',  //测试环境打包目录
    statics: {
      "source": ["{path}/*.html", "{path}/static/**", "{path}/**/*.vm"],
      "build": "{path}/preproduction",
      "base": "{path}"
    },
    zip: {
      "source": ["{path}/preproduction/**", "!{path}/preproduction/*.zip"],
      "build": '{path}/preproduction'
    },
    clean: "{path}/preproduction/*"
  },
  //生成环境
  build: {
    path: '{path}/dist',  //生成环境打包目录
    js: {
      "source": "{path}/static/js/bundle/**/*.js",
      "build": "{path}/dist/static/js/bundle"
    },
    css: {
      "source": "{path}/static/css/pages/*.css",
      "build": "{path}/dist/static/css/pages"
    },
    image: {
      "source": "{path}/static/img/**",
      "build": "{path}/dist/static/img"
    },

    html: {
      "source": "{path}/*.html",
      "build": "{path}/dist",
      "inline": "{path}",
      "cdn": ""
    },
    
    statics: {
      "source": ["{path}/static/css/fonts/**", "{path}/static/js/vendor/**", "{path}/static/media/**"],
      "build": "{path}/dist",
      "base": "{path}"
    },

    base64: {
      "source": "{path}/dist/static/css/pages/*.css",
      "build": "{path}/dist/static/css/pages/"
    },
    clean: "{path}/dist/*",
    zip: {
      "source": ["{path}/dist/**", "!{path}/dist/*.zip"],
      "build": '{path}/dist'
    }
  }
}
