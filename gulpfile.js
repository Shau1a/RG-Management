let gulp          = require('gulp');
let sass          = require('gulp-sass');
    sass.compiler = require('node-sass');
let rename        = require('gulp-rename');
let cleanCSS      = require('gulp-clean-css');
let autoprefixer  = require('gulp-autoprefixer');
let sourcemaps    = require('gulp-sourcemaps');
let browserSync   = require('browser-sync').create();
let imagemin      = require('gulp-imagemin');
let minify        = require("gulp-babel-minify");


let path = {
  style_sass  :   ['app/sass/*.sass'],
  style_css   :   ['app/css/*.css'],
  font        :   ['app/fonts/*'],
  js          :   ['app/scripts/*'],
  img         :   ['app/images/*']
};


gulp.task('font-move', () => {
  return gulp.src(path.font)
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('styles', () => {
  return gulp.src(path.style_sass)
  .pipe(sass({
      errorLogToConsole: true
      }))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream({once: true}))
});

gulp.task('minify-css', () => {
  return gulp.src(path.style_css)
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream({once: true}))
});

gulp.task('jsminify', () => {
  return gulp.src(path.js)
    .pipe(sourcemaps.init())
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("dist/scripts"))
    .pipe(browserSync.stream({once: true}))
});

gulp.task('imgs', () => {
  return gulp.src(path.img)
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'))
      .pipe(browserSync.stream({once: true}))
});


gulp.task('sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  });
})


gulp.task('watcher', () => {
  gulp.watch(path.style_sass, gulp.series('styles', 'minify-css'))
  gulp.watch(path.js, gulp.series('jsminify'))
});

gulp.task('default', gulp.parallel('styles', 'jsminify', 'watcher', 'sync'));