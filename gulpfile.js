var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var server = require('gulp-express');

gulp.task('lint', function() {
    return gulp.src('config/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    return gulp.src('config/styles/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets/styles'));
});

gulp.task('scripts', function() {
    return gulp.src('config/scripts/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('assets/scripts'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/scripts'));
});

gulp.task('scriptDependencies', function() {
  return gulp.src('config/scripts/dependencies/*.js')
  .pipe(concat('dependencies.js'))
  .pipe(gulp.dest('assets/scripts/dependencies'));
})


gulp.task('watch', function() {
    gulp.watch('config/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('config/styles/*.scss', ['sass']);
    gulp.watch('index.html');
});

gulp.task('server', function() {
  server.run({
    file: 'index.js'
  });

  gulp.watch('config/scripts/*.js', ['lint', 'scripts']);
  gulp.watch('config/styles/*.scss', ['sass']);
  gulp.watch('index.html');
  gulp.watch(['index.js', 'public'], [server.run]);

})


gulp.task('default', ['lint', 'sass', 'scriptDependencies', 'scripts','server']);
