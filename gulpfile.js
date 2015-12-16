var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

gulp.task('styles', function() {
  return sass('sass/app.scss', { style: 'expanded' })
    .pipe(gulp.dest('assets/stylesheets'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
});

gulp.task('default', ['watch'], function() {

});
