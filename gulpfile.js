var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync'),
	minifyCSS = require('gulp-minify-css'),
	mainBowerFiles = require('main-bower-files'),
	bowerFiles = mainBowerFiles(),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	util = require('gulp-util'),
	eslint = require('gulp-eslint'),
	gulpif = require('gulp-if');

/******************************
 * Default task
 ******************************/
gulp.task('default', [
	'copyAssets',
	'copyViews',
	'browser-sync',
	'bower-me',
	'pluginsConcat',
	'jsConcat',
	'less',
	'watch'
]);

/******************************
 * Build task
 ******************************/
gulp.task('build', [
	'copyAssets',
	'copyViews',
	'bower-me',
	'pluginsConcat',
	'jsConcat',
	'less-min'
]);

/******************************
 * Bower files task
 ******************************/
gulp.task('bower-me', function () {
	console.info('********** Bower Files **********');
	console.info(bowerFiles);
});

/******************************
 * ESlint task
 ******************************/
gulp.task('lint', function () {
	var options = {
		configFile: '.eslintrc'
	};
	return gulp.src(['app/**/*.js'])
		.pipe(eslint(options))
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError())
		.on('error', notify.onError(function (error) {
			return '\nJS linting error occured.\nLook in the console for details.\n' + error.message;
		}));
});

/******************************
 * Copy assets to public
 ******************************/
gulp.task('copyAssets', function () {
	'use strict';
	gulp.src([
			'assets/**/*.*',
			'!assets/**/*.less',
			'!assets/**/*.html',
			'!assets/icons/*.svg'
		])
		.pipe(gulp.dest('public'));
});

/******************************
 * Copy views to public
 ******************************/
gulp.task('copyViews', function () {
	'use strict';

	gulp.src('app/**/*html')
		.pipe(gulp.dest('public'));
});

/******************************
 * JS plugins
 ******************************/
gulp.task('pluginsConcat', function () {
	gulp.src(bowerFiles)
		.pipe(concat('plugins.min.js'))
		.pipe(uglify({
			mangle: true
		}))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * JS concat
 ******************************/
gulp.task('jsConcat', ['lint'], function () {
	gulp.src(['app/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		// .pipe(uglify({
		// 	mangle: false
		// }))
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while uglifying js.\nLook in the console for details.\n' + error;
		}))
		.pipe(sourcemaps.write('../js'))
		.pipe(gulp.dest('public/js'));
});

/******************************
 * Browser sync
 ******************************/
gulp.task('browser-sync', function () {
	var files = [
		'public/js/**/*.js',
		'public/css/*.css',
		'public/index.html'
	];

	browserSync.init(files, {
		open: false,
		server: {
			baseDir: './public',
			middleware: []
		},
		ghostMode: false
	});
});

/******************************
 * Watch
 ******************************/
gulp.task('watch', function () {
	gulp.watch(['assets/less/**/*.less'], ['less']);
	gulp.watch('app/**/*.js', ['jsConcat']);
	gulp.watch('app/**/*.html', ['copyViews']);
	gulp.watch(['assets/**/*.*', '!assets/less/*.less'], ['copyAssets']);
});

/******************************
 * Less
 ******************************/
gulp.task('less', function () {
	gulp.src(['assets/less/app.less'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('../css'))
		.pipe(gulp.dest('public/css'));
});

/******************************
 * Less min
 ******************************/
gulp.task('less-min', function () {
	gulp.src(['assets/less/app.less', 'assets/less/ie9.less'])
		.pipe(plumber())
		.pipe(less())
		.on('error', notify.onError(function (error) {
			return '\nAn error occurred while compiling css.\nLook in the console for details.\n' + error;
		}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(minifyCSS({
			keepBreaks: false,
			keepSpecialComments: true,
			benchmark: false,
			debug: true
		}))
		.pipe(gulp.dest('public/css'));
});
