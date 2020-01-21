const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function styles(){
  return gulp.src('./src/preCss/**/*.css')
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    overrideBrowserslist:['>0.1%'],
    cascade:false
  }))
  .pipe(cleanCss({level:2}))
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
  gulp.watch('./src/preCss/**/*.css', styles);
  gulp.watch('./src/preJs/**/*.js', scripts);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('build', gulp.series(gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
