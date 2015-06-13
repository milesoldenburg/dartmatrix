// Dependencies
var appdmg = require('appdmg');
var bower = require('gulp-bower');
var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var packager = require('electron-packager');
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

gulp.task('clean', function(){
    // Delete default resources
    del([
        'dist/*'
    ]);
});

/**
 * Copies resources for Mac bundle
 */
gulp.task('bundle', ['clean', 'lint'], function(){
    packager({
        dir : './',
        name : 'DartMatrix',
        platform : 'darwin',
        arch : 'x64',
        version : '0.27.2',
        out : './dist',
        icon : './lib/resources/mac/DartMatrix.icns',
        prune : true,
        ignore : 'node_modules',
        asar : true
    }, function done(err, appPath){
        if (err) {
            console.error(err);
        }

        console.log('app built to', appPath);
    });
});

gulp.task('clean:dmg', function(){
    // Delete default resources
    del([
        'dist/DartMatrix.dmg'
    ]);
});

gulp.task('dmg', ['clean:dmg'], function(){
    var dmgr = appdmg({
        source: 'lib/resources/osx/appdmg.json',
        target: 'dist/DartMatrix.dmg'
    });

    dmgr.on('finish', function(){
        console.log('DartMatrix.dmg finished');
    });

    dmgr.on('error', function(err){
        console.log('Error creating dmg', err);
    });
});

/**
 * Task to run all lint subtasks
 */
gulp.task('lint', ['lint:config', 'lint:lib', 'jscs:config', 'jscs:lib']);

/**
 * Default gulp task
 */
gulp.task('default', ['bundle']);
