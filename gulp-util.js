var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var rev = require('gulp-rev');	//版本修正
var revReplace = require('gulp-rev-replace');	//版本替换
var gulpif = require('gulp-if');	//条件判断

module.exports = {
	//编译html文件
	compileHtml(opts) {
		var inlineResource = require('gulp-inline-resource');	//内联css和js代码
		var minifyhtml = require('gulp-minify-html')	//html压缩
		var minifyInline = require('gulp-minify-inline');	//压缩内联css和js代码
		var replace = require('gulp-replace');	//路径替换
		var processhtml = require('gulp-processhtml')	//处理html模板

		var source = opts.source,
				build = opts.build,
				inline = opts.inline,
				cdn = opts.cdn;

		var manifest = gulp.src('rev-manifest.json');

		return gulp.src(source)
			.pipe(processhtml())
			.pipe(inlineResource({ path: inline }))
			// .pipe(minifyhtml())
			.pipe(minifyInline({
				jsSelector: 'script[type!="text/html"]'
			}))
			.pipe(revReplace({manifest: manifest}))
			.pipe(replace(/([=|'|"]{1})(\.?\/?)(static\/[\w|-]*)/ig, function(match, one, two, three) {
				return one + opts.cdn + three;
			}))
			.pipe(gulp.dest(build));
	},
	//编译vm文件
	compileVm(opts) {
		var inlineResource = require('gulp-inline-resource');	//内联css和js代码
		var minifyhtml = require('gulp-minify-html')	//html压缩
		var minifyInline = require('gulp-minify-inline');	//压缩内联css和js代码
		var replace = require('gulp-replace');	//路径替换
		var processhtml = require('gulp-processhtml')	//处理html模板
		var rename = require("gulp-rename");

		var source = opts.source,
				build = opts.build,
				inline = opts.inline,
				cdn = opts.cdn;

		var manifest = gulp.src('rev-manifest.json');

		return gulp.src(source)
			.pipe(rename({ extname: ".html" }))
			.pipe(processhtml())
			.pipe(inlineResource({ path: inline }))
			// .pipe(minifyhtml())
			.pipe(minifyInline({
				jsSelector: 'script[type!="text/html"]'
			}))
			.pipe(revReplace({manifest: manifest}))
			.pipe(replace(/([=|'|"]{1})(\.?\/?)(static\/[\w|-]*)/ig, function(match, one, two, three) {
				return one + opts.cdn + three;
			}))
			.pipe(rename({ extname: ".vm" }))
			.pipe(gulp.dest(build));
	},
	//编译css文件
	compileCss(opts) {
		var minifycss = require('gulp-minify-css')		//css压缩

		var source = opts.source,
				build = opts.build;

		return gulp.src(source)
			.pipe(minifycss())
			.pipe(rev())
			.pipe(gulp.dest(build))
			.pipe(rev.manifest({
				base: build,
				merge: true
			}))
			.pipe(gulp.dest(build));
	},

	//编译js文件
	compileJs(opts) {
		var uglify = require('gulp-uglify');	//压缩

		var source = opts.source,
				build = opts.build;

		return gulp.src(source)
			.pipe(uglify())
			.pipe(rev())
			.pipe(gulp.dest(build))
			.pipe(rev.manifest({
				base: build,
				merge: true
			}))
			.pipe(gulp.dest(build));
	},

	//编译图片
	compileImages(opts) {
		var imagemin = require('gulp-imagemin');	//图片压缩
		var pngquant = require('imagemin-pngquant'); //png图片压缩
		var jpegRecompress = require('imagemin-jpeg-recompress');	//jpg图片压缩

		var source = opts.source,
				build = opts.build;
		return gulp.src(source)
			.pipe(imagemin(
				[imagemin.gifsicle(), jpegRecompress({ quality: 'low' }), pngquant(), imagemin.svgo()]
			// 	{
      //       // optimizationLevel: 3, //类型：Number  默认：3  取值范围：0-7（优化等级）
      //       // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      //       // multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
			// 			// accurate: true,//高精度模式
      //       // quality: "high",//图像质量:low, medium, high and veryhigh;
      //       // method: "smallfry",//网格优化:mpe, ssim, ms-ssim and smallfry;
      //       // min: 70,//最低质量
      //       // loops: 0,//循环尝试次数, 默认为6;
      //       // progressive: false,//基线优化
      //       // subsample: "default",//子采样:default, disable;
      //       // use: [pngquant(), jpegRecompress()] //使用pngquant深度压缩png图片的imagemin插件
			// }
			))
			.pipe(gulp.dest(build));
	},

	//转成base64格式
	Base64(opts) {
		var cssBase64 = require('gulp-css-base64');		//将图片转为base64

		var source = opts.source,
				build = opts.build;

		return gulp.src(source)
			.pipe(cssBase64({
			  // baseDir: path.image,
				maxWeightResource: 1024,
				extensionsAllowed: ['.jpg', '.png']
			}))
			.pipe(gulp.dest(build));
	},

	//创建sprite图
	createSprites(opts) {
		var sprite = require('gulp-sprite-generator');  //css的sprite

		var source = opts.source,
				build = opts.build,
				image = opts.image,
				spriteName = opts.spriteName;

	  var spriteOutput = gulp.src(source)
	      .pipe(sprite({
	          baseUrl:         image,
	          spriteSheetName: spriteName,
	          spriteSheetPath: image,
	          padding: 10
	      }));

	  spriteOutput.css.pipe(gulp.dest(build));
	  return spriteOutput.img.pipe(gulp.dest(image));
	},

	//复制静态资源(包括字体等等不需要编译的静态文件)
	duplicateStatic(opts) {
		var source = opts.source,
				build = opts.build,
				base = opts.base;

		return gulp.src(source, { base: base })
			.pipe(gulp.dest(build));
	},

	//编译less文件
	less(opts) {
		var less = require('gulp-less');		//less插件
		var plumber = require('gulp-plumber');	//错误流捕获
		var autoprefixer = require('gulp-autoprefixer');	//css前缀添加
		var pxtorem = require('gulp-pxtorem');

		var source = opts.source,
				build = opts.build,
				pxtoremConfig = opts.pxtorem;

		return gulp.src(source)
		  	.pipe(plumber())
		    .pipe(less())
				.pipe(gulpif(pxtoremConfig.isUse, pxtorem(pxtoremConfig)))
	      // .pipe(pxtorem(pxtoremConfig))
		    .pipe(autoprefixer())
		    .pipe(gulp.dest(build));
	},

	//编译velocity模板
	velocity(opts) {
		var velocity = require('./lib/gulp-velocity.js');
		var rename = require("gulp-rename");

		return gulp.src(opts.source)
			.pipe(velocity({ default: opts.default , mock: opts.mock, includeBase: opts.includeBase}))
			.pipe(rename({ extname: ".html" }))
			.pipe(gulp.dest(opts.build))
	},

	//清除目录
	clean(path) {
		var clean = require('gulp-clean');	//清除

		return gulp.src(path)
			.pipe(clean({ force: true }));
	},

	//打包成zip文件
	zip(opts) {
		var zip = require('gulp-zip');

		var source = opts.source,
				build = opts.build,
				filename = (new Date()).toISOString().replace(/\:/gi, '-') + '.zip';

				console.log(filename);
		return gulp.src(opts.source)
			.pipe(zip(filename))
			.pipe(gulp.dest(build));
	},

	//路径替换
	// replacePath(opts) {
	// 	var replace = require('gulp-replace');
	//
	// 	return gulp.src(opts.source)
	// 		.pipe(replace(/(\.?\/?)(static\/[\w|-]*)/ig, function(match, one, two) {
	// 			return path.join(opts.cdn, two);
	// 		}))
	// 		.pipe(gulp.dest(opts.build))
	// }


}
