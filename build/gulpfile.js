let gulp = require('gulp');
let bom = require('gulp-bom');
let jshint = require('gulp-jshint'); //js规范验证
let sequence = require('gulp-sequence');
let uglify = require('gulp-uglify');
let imagemin = require('gulp-imagemin');
let rjs = require('requirejs');

let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let px2rem = require('gulp-px2rem-plugin');

let sourcemaps = require('gulp-sourcemaps');
let base64 = require('gulp-base64');
let clean = require('gulp-clean');
let babel = require('gulp-babel');
let rev = require('gulp-rev');
let revReplace = require('gulp-rev-replace');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

sass.compiler = require('node-sass');

// 静态资源路径
let viewlist = ['../pages'];

let assets_path = '../assets';
let assets_js_path = `${assets_path}/js`;
let assets_css_path = `${assets_path}/css`;
let assets_sass_path = `${assets_path}/sass`;
let assets_img_path = `${assets_path}/img`;

let release_path = './release';
let release_assets_path = assets_path.replace('../', './release/');
let release_js_path = `${release_assets_path}/js`;
let release_css_path = `${release_assets_path}/css`;
let release_sass_path = `${release_assets_path}/sass`;
let release_img_path = `${release_assets_path}/img`;

/*
页面路径：./release/wwwroot/Public/Home/assets
引入路径：Public/Home/assets
md5_relative_path=./release/wwwroot
*/
let md5_relative_path = './release';

/*------------------------>开发时执行<------------------------*/
gulp.task('default', ['server']);

gulp.task('server', ['sass', 'lint'], () => {
	browserSync.init({
		port: 3000,
		watch: true,
		server: {
			baseDir: ["../views", "../"]
		},
	});
	gulp.watch(`${assets_sass_path}/**/*.scss`, ['sass']);
	gulp.watch([`${assets_js_path}/global/**/*.js`, `${assets_js_path}/modules/**/*.js`], ['lint']);

	let views = [];
	viewlist.forEach((item) => {
		views.push(item + '/**/*.{html,cshtml}');
	});
	gulp.watch([...views], ['html']).on('change', reload);
});

gulp.task('html', () => {
	return gulp.src(['../pages/**', '!../pages/layout', '!../pages/layout/**'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('../views'));
});

gulp.task('sass', () => {
	return new Promise((resolve, reject) => {
		return setTimeout(() => {
			return gulp
				.src(`${assets_sass_path}/**/*.scss`)
				.on('error', function (e) {
					return reject(e) && this.end();
				})
				.pipe(sourcemaps.init())
				.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
				.pipe(
					autoprefixer({
						overrideBrowserslist: ['last 5 versions', 'Android >= 4.0', '> 10%', 'ie 9'],
						cascade: false
					})
				)
				.pipe(sourcemaps.write('.'))
				.pipe(px2rem({'width_design':750,'valid_num':6,'pieces':10,'ignore_px':[1,2]}))
				.pipe(gulp.dest(assets_css_path))
				.on('end', resolve)
				.pipe(
					reload({
						stream: true
					})
				);
		}, 200);
	}).catch(function (e) {
		return console.warn(e.messageFormatted);
	});
});

gulp.task('lint', () => {
	return gulp
		.src([`${assets_js_path}/{global,modules}/**/*.js`])
		.pipe(
			reload({
				stream: true
			})
		)
		.pipe(
			jshint({
				expr: true
			})
		)
		.pipe(jshint.reporter('default'));
});

/*------------------------>版本发布<------------------------*/

gulp.task('build', sequence('clean:release', 'clean:sass', 'es6', 'md5', 'imagemin',
 'img2base64', ['revreplace:html', 'revreplace:css:js'], 'uglify'));


//es6转ea5
gulp.task('es6', () => {
	return gulp
		.src(
			[
				`${release_js_path}/**/*.js`,
				`!${release_js_path}/{libs,plugs,plugins,vendor}/**/*.js`,
				`${release_js_path}/global/**/*.js`
			],
			{
				base: release_js_path
			}
		)
		.pipe(
			babel({
				presets: [
					[
						'@babel/env',
						{
							targets: {
								browsers: ['ie >= 8', 'chrome >= 62']
							}
							// "modules": 'amd'//将当前模块转换成其它模块类型,非模块文件默认转换成commonjs模块类型
						}
					]
				]
				// plugins: ["@babel/plugin-transform-strict-mode"],
			}).on('error', (err) => {
				console.log(err);
			})
		)
		.pipe(gulp.dest(release_js_path));
});


//删除sass目录
gulp.task('clean:sass', () => {
	return gulp
		.src(release_sass_path, {
			read: false
		})
		.pipe(clean());
});

//静态资源生成md5
gulp.task('md5', () => {
	return gulp
		.src(
			[
				`${release_js_path}/**/*.js`,
				`!${release_js_path}/{modules,libs,plugs,plugins,vendor,global}/**/*.js`,
				`${release_js_path}/global/ssologin.js`,
				`!${release_js_path}/config.js`,
				`${release_css_path}/**/*.css`,
				`${release_img_path}/**/*`,
				`${release_js_path}/{template,modules}/**/*.htm`
			],
			{
				base: md5_relative_path
			}
		)
		.pipe(rev())
		.pipe(gulp.dest(md5_relative_path))
		.pipe(rev.manifest())
		.pipe(gulp.dest(md5_relative_path));
});

//压缩图片
gulp.task('imagemin', () => {
	return gulp
		.src([`${release_img_path}/**/*.{jpg,svg,ico}`])
		.pipe(
			imagemin({
				optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
				progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
				interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
				multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
			})
		)
		.pipe(gulp.dest(release_img_path));
});

//小图转成base64字符串
gulp.task('img2base64', () => {
	return gulp
		.src([`${release_css_path}/**/*.css`])
		.pipe(
			base64({
				baseDir: md5_relative_path,
				maxImageSize: 8 * 1024 // bytes
			})
		)
		.pipe(gulp.dest(release_css_path));
});

//替换页面中对应的md5资源
gulp.task('revreplace:html', () => {
	let manifest = gulp.src(`${release_path}/rev-manifest.json`);
	let views = [];
	viewlist.forEach((item) => {
		views.push(item + '/**/*');
	});
	return gulp
		.src([...views], {
			base: '../'
		})
		.pipe(bom())
		.pipe(
			revReplace({
				manifest: manifest,
				replaceInExtensions: ['.html', '.cshtml']
			})
		)
		.pipe(gulp.dest(release_path));
});

//替换css、js、htm模板中对应的md5资源
gulp.task('revreplace:css:js', () => {
	let manifest = gulp.src(`${release_path}/rev-manifest.json`);
	return gulp
		.src([`${release_css_path}/**/*.css`, `${release_js_path}/**/*.{js,htm}`], {
			base: release_assets_path
		})
		.pipe(
			revReplace({
				manifest: manifest,
				replaceInExtensions: ['.htm', '.js', '.css']
			})
		)
		.pipe(gulp.dest(release_assets_path));
});

// 压缩js文件
gulp.task('uglify', () => {
	return (
		gulp
			.src([
				`${release_js_path}/**/*.js`,
				`!${release_js_path}/{libs,vendor,modules,plugs,plugins}/**/*.js`,
				`!${release_js_path}/config.js`
			])
			// .pipe(sourcemaps.init())
			.pipe(uglify())
			.on('error', (err) => {
				console.log('压缩失败', err);
			})
			// .pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(release_js_path))
	);
});

//删除目录
gulp.task('clean:release', () => {
	return gulp
		.src([release_path], {
			read: false
		})
		.pipe(clean());
});
