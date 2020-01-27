const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');

const isDev = true;
const isProd = !isDev;

function styles(){
  return gulp.src('./src/preCss/styles.less')
  .pipe(gulpif(isDev, sourcemaps.init()))
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(gcmq())
  .pipe(autoprefixer({
    overrideBrowserslist:['>0.1%'],
    cascade:false
  }))
  .pipe(gulpif(isProd, cleanCss({level:2})))
  .pipe(gulpif(isDev, sourcemaps.write()))
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());

}

function scripts(){
  return gulp.src('./src/preJs/**/*.js')
  .pipe(concat('script.css'))
  .pipe(uglify({toplevel:true}))
  .pipe(gulp.dest('./build/js'))
  .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
      basedir: "./"
    }
  });
  gulp.watch('./src/preCss/**/*.less', styles);
  gulp.watch('./src/preJs/**/*.js', scripts);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('dev', gulp.series('build', 'watch'));
