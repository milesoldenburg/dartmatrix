// Dependencies
var bower = require('gulp-bower');
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var ncp = require('ncp').ncp;
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
    return bower({directory : path.join(__dirname, 'lib/static/bower_components')});
});

/**
 * Compiles LESS into CSS
 */
gulp.task('less', function(){
    var autoprefix = new LessPluginAutoPrefix({
        browsers : ['last 1 Chrome version']
    });

    return gulp.src(path.join(__dirname, 'lib/static/css/styles.less'))
        .pipe(less({
            plugins : [autoprefix]
        }))
        .pipe(gulp.dest(path.join(__dirname, 'lib/static/css')));
});

/**
 * Watches for changes in LESS and then triggers the less task
 */
gulp.task('watch', function(){
    gulp.watch(path.join(__dirname, 'lib/static/css/styles.less'), ['less']);
});

/**
 * Copies resources for Mac bundle
 */
gulp.task('bundle', function(){
    // Recursively copy prebuilt binary
    ncp(path.join(__dirname, 'node_modules/electron-prebuilt/dist/Electron.app'), path.join(__dirname, 'dist/DartMatrix.app'), function(err){
        if (err) {
            return console.error(err);
        }

        // Delete default resources
        del([
            'dist/DartMatrix.app/Contents/Resources/*'
        ]);

        // Copy plist
        gulp.src(path.join(__dirname, 'lib/resources/mac/Info.plist'))
            .pipe(gulp.dest(path.join(__dirname, 'dist/DartMatrix.app/Contents')));

        // Copy icon
        gulp.src(path.join(__dirname, 'lib/resources/mac/DartMatrix.icns'))
            .pipe(gulp.dest(path.join(__dirname, 'dist/DartMatrix.app/Contents/Resources')));
    });
});

/**
 * Task to run all lint subtasks
 */
gulp.task('lint', ['lint:config', 'lint:lib', 'jscs:config', 'jscs:lib']);

/**
 * Default gulp task
 */
gulp.task('default', ['lint']);
