var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var files      = ['lib/gl-matrix-min.js',
                  'lib/K3D.js',
                  'lib/Entity.js',
                  'lib/Tree.js',
                  'lib/NodeTree.js',
                  'lib/ShadersContent.js',
                  'lib/Shader.js',
                  'lib/Color.js',
                  'lib/Light.js',
                  'lib/Transform.js',
                  'lib/Camera.js',
                  'lib/Mesh.js',
                  'lib/Resource.js',
                  'lib/ResourceManager.js',
                  'lib/Scene.js',
                  'lib/Aubengine.js'
                 ]

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


gulp.task('watch', function() {
  gulp.watch('lib/*.js', ['scripts']);
});



gulp.task('default', ['scripts', 'lint', 'watch']);
