var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var server = require('gulp-express');
var browserify = require('gulp-browserify');

gulp.task('lint', function() {
    return gulp.src('lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// gulp.task('sass', function() {
//     return gulp.src('config/styles/*.scss')
//         .pipe(sass())
//         .pipe(concat('style.css'))
//         .pipe(gulp.dest('assets/styles'));
// });

gulp.task('scripts', function() {
    return gulp.src('lib/Aubengine.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist'))
        .pipe(rename('Aubengine.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['scripts']);
});



gulp.task('default', ['scripts', 'lint', 'watch']);
