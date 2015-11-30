
var gulp = require('gulp');
var sass = require('gulp-sass');
var taskListing = require('gulp-task-listing');

gulp.task("help",taskListing);

gulp.task('default', ['html', 'sass', 'javascript', 'images']);

gulp.task('html', function () {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./build'));
});
gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});
gulp.task('javascript', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./build'));

});
gulp.task('watch', ['default'], function(){
  gulp.watch('.src/**/*',['default']);
  console.log('watching for updates!');
});
gulp.task('images', function () {
  return gulp.src('./src/**/*.png')
    .pipe(gulp.dest('./build'));
});
