
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    gls = require('gulp-live-server');


gulp.task('default', ['build', 'serve', 'watch']);

gulp.task('build', ['scss', 'js', 'fonts', 'images', 'favicon']);

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('app/resources/scss/**/*.scss', ['style-base']),
  gulp.watch('app/resources/js/**/*.js', ['js']),
  gulp.watch('app/resources/fonts/**/*', ['fonts']),
  gulp.watch('app/views/**/*.pug').on('change', browserSync.reload);
});

gulp.task('scss', ['style-base']);

gulp.task('fonts', function() {
  return gulp.src(['./node_modules/open-iconic/font/fonts/*',
    'app/resources/fonts/**/*'])
    .pipe(gulp.dest('build/fonts'))
})

gulp.task('images', function() {
  return gulp.src(['app/resources/img/**/*'])
    .pipe(gulp.dest('build/img'))
})

gulp.task('favicon', function() {
  return gulp.src(['app/resources/favicon/*'])
    .pipe(gulp.dest('build'))
})

gulp.task('style-base', function() {
  console.log('Transpiling base styles.');
  gulp
    .src([
      'node_modules/normalize-scss/sass/_normalize.scss',
      'node_modules/video.js/src/css/video-js.scss',
      'app/resources/scss/style.scss'])
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', notify.onError(function(e) {
      return 'Failed to compile base SCSS' + e.message;
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream())
});

gulp.task('js', function () {

  console.log('Minify js files.');
  gulp
    .src([
        'node_modules/video.js/dist/video.js',
        'app/resources/js/**/*.js'])
    .pipe(
        uglify()
    )
    .on('error', notify.onError(function(e) {
        console.log(e);
        return 'Failed to minifying JS' + e.message;
    }))
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream())
});

gulp.task('browserSync', function() {
  if(browserSync.active) {
    browserSync.exit();
  } else {
    browserSync.init({
      proxy: 'localhost:3000',
      port: '2998'
    });
  }
})

gulp.task('serve', function() {
    //1. serve with default settings
//    var server = gls.static('build', 3000); //equals to gls.static('public', 3000);
//    server.start();

    //2. serve at custom port
    var server = gls('app.js', {env: {NODE_ENV: 'development'}});
    server.start();

    //3. serve multi folders
//    var server = gls.static(['dist', '.tmp']);
  //  server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['app.js'], function (file) {
      server.notify.apply(server, [file]);
    });
});