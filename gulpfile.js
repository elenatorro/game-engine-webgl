var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var connect    = require('gulp-connect');

var files      =    ['src/gl-matrix-min.js',
                     'src/Globals.js',
                     'src/Configuration.js',
                     'src/FrameAnimation.js',
                     'src/Lights.js',
                     'src/Shaders.js',
                     'src/Program.js',
                     'src/Mesh.js',
                     'src/Scene.js',
                     'src/Axis.js',
                     'src/Floor.js',
                     'src/Color.js',
                     'src/Camera.js',
                     'src/CameraInteractor.js',
                     'src/SceneTransforms.js',
                     'src/NodeTree.js',
                     'src/Tree.js',
                     'src/Aubengine.js'
                   ];

var dependencies = ['gui/jquery-1.5.1.min.js',
                    'gui/jquery-ui-1.8.13.custom.min.js',
                    'gui/colorpicker.js',
                    'gui/prettify.js',
                    'gui/codeview.js'
                  ];

gulp.task('lint', function() {
    return gulp.src('lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src(files)
        .pipe(concat('Aubengine.js'))
        .pipe(gulp.dest('dist'))
        // .pipe(rename('Aubengine.min.js'))
        // .pipe(uglify())
        // .pipe(gulp.dest('dist'));
});

gulp.task('dependencies', function() {
  return gulp.src(dependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('dist'))
})


gulp.task('watch', function() {
  gulp.watch('src/*.js', ['scripts']);
});

gulp.task('connect', function () {
  connect.server({
    root: ['examples', './'],
    port: 8000
  });
});

gulp.task('default', ['scripts', 'dependencies', 'lint', 'watch', 'connect']);
