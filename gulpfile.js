var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var fs = require('fs');

gulp.task('js', function () {
  gulp.src('src/*.js')
    .pipe(babel())
    .pipe(concat('big-heads.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('bookmarklet', ['js'], function () {
  var bigHeadsMin = fs.readFileSync('dist/big-heads.min.js')

  fs.writeFileSync('dist/bookmarklet.js', 'javascript:(function(){' + bigHeadsMin + '})()');
});

gulp.task('default', ['bookmarklet']);

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['bookmarklet']);
});
