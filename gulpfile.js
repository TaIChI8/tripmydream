var gulp = require('gulp');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
// var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');


gulp.task('clean', function () {
  //return del([ 'dist' ]);
});


gulp.task('styles', function () {
  return gulp.src('./src/stylus/main.styl', { sourcemaps: true })
    .pipe(plumber())
    .pipe(stylus({ outputStyle: 'expanded', errLogToConsole: true })).on("error", notify.onError({ sound: false }))
    .pipe(postcss([
      require('postcss-inline-svg'),
      require('postcss-svgo'),
      autoprefixer({
        browsers: ['last 2 versions', '> 1%', 'Android >= 4', 'iOS >= 8'],
        cascade: false
      })
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('html', function () {
  return gulp.src('./src/pages/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});


gulp.task('scripts', function () {
  return gulp.src('./src/js/**/*')
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});


gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*', { since: gulp.lastRun('assets') })
    .pipe(gulp.dest('./dist/assets'))
    .pipe(browserSync.stream());
});


gulp.task('server', function () {
  browserSync.init({
    server: './dist',
    notify: false,
  });
});


gulp.task('watch', function () {
  gulp.watch([
    './src/stylus/main.styl',
    './src/stylus/**/*.styl',
    './src/components/**/*.styl'
  ], gulp.parallel('styles'));

  gulp.watch([
    './src/pages/*.pug',
    './src/components/**/*.pug'
  ], gulp.parallel('html'));

  gulp.watch([
    './src/js/*.js',
  ], gulp.parallel('scripts'));

  gulp.watch([
    './src/assets/**/*',
  ], gulp.parallel('assets'));
});


gulp.task('default', gulp.series('styles', 'html', 'scripts', 'assets', gulp.parallel('server', 'watch')));
