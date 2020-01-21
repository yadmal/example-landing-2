const gulp = require('gulp');

function styles(){
  return gulp.src('./src/preCss/**/*.css')
  .pipe(gulp.dest('./build/css'));
}

function scripts(){
  return gulp.src('./src/preJs/**/*.js')
  .pipe(gulp.dest('./build/js'));
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
