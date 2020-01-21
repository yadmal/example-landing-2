const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

function styles(){
  return gulp.src('./src/preCss/**/*.css')
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    overrideBrowserslist:['>0.1%'],
    cascade:false
  }))
  .pipe(gulp.dest('./build/css'));
}

function scripts(){
  return gulp.src('./src/preJs/**/*.js')
  .pipe(gulp.dest('./build/js'));
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
