var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

function compilaSass() {
  return gulp
  .src('./styles/scss/*.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(gulp.dest('./styles/css/'))
  .pipe(browserSync.stream());
};

gulp.task('sass-compiler', compilaSass);

function browser(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
}

gulp.task('browser-sync', browser);

function watchFunc(){
  gulp.watch("./styles/scss/**/*.scss", compilaSass);
  gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('watch', watchFunc);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass-compiler'))