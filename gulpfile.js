// Dependencies
var bower = require('gulp-bower');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var path = require('path');

/**
 * Lints the config files
 */
gulp.task('lint:config', function(){
    return gulp.src(path.join(__dirname, 'gulpfile.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Lints lib js
 */
gulp.task('lint:lib', function(){
    return gulp.src(path.join(__dirname, 'lib/main.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

/**
 * Runs style check on config files
 */
gulp.task('jscs:config', function(){
    return gulp.src(path.join(__dirname, 'gulpfile.js'))
        .pipe(jscs({
            configPath : '.jscsrc',
            fix : true
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Runs style check on lib js
 */
gulp.task('jscs:lib', function(){
    return gulp.src(path.join(__dirname, 'lib/main.js'))
        .pipe(jscs({
            configPath : '.jscsrc',
            fix : true
        }))
        .pipe(gulp.dest(path.join(__dirname, 'lib')));
});

/**
 * Installs bower components
 */
gulp.task('bower', function(){
    return bower({directory : './static/bower_components'});
});

/**
 * Copies bower components for use
 */
gulp.task('copy', function(){
    gulp.src(path.join(__dirname, 'static/bower_components/ubuntu-fontface/fonts/*'))
        .pipe(gulp.dest(path.join(__dirname, 'static/css/fonts')));
});

/**
 * Compiles LESS into CSS
 */
gulp.task('less', ['copy'], function(){
    return gulp.src(path.join(__dirname, 'static/css/styles.less'))
        .pipe(less({
            paths : [path.join(__dirname, 'static/bower_components')]
        }))
        .pipe(gulp.dest(path.join(__dirname, 'static/css')));
});

/**
 * Task to run all lint subtasks
 */
gulp.task('lint', ['lint:config', 'lint:lib', 'jscs:config', 'jscs:lib']);

/**
 * Default gulp task
 */
gulp.task('default', ['lint']);
