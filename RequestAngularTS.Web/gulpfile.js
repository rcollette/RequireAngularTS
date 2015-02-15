//initialize all of our variables
var concat,
    gulp, gutil,
    sass, uglify, minifyCSS,
    del, connect, autoprefixer, ts, sourcemaps,
    ngAnnotate, rename, watch, plumber,
    addsrc, autoPrefixBrowserList, cached,
    gulpIgnore;

autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

gulp = require('gulp');
gutil = require('gulp-util');
concat = require('gulp-concat');
uglify = require('gulp-uglify');
//sass = require('gulp-sass');
minifyCSS = require('gulp-minify-css');
connect = require('gulp-connect');
del = require('del');
autoprefixer = require('gulp-autoprefixer');
ts = require('gulp-typescript');
sourcemaps = require('gulp-sourcemaps');
ngAnnotate = require('gulp-ng-annotate');
rename = require('gulp-rename');
plumber = require('gulp-plumber');
// note the somewhat odd requirement to pass the gulp module to gulp-chokidar
watch = require('gulp-chokidar')(gulp);
addsrc = require('gulp-add-src');
cached = require('gulp-cached');
gulpIgnore = require('gulp-ignore');

gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('images-deploy', function () {
    gulp.src(['app/images/**/*'])
        .pipe(gulp.dest('dist/images'));
});

gulp.task('scripts-deploy', function () {
    //this is where our dev JS scripts are
    return gulp.src('app/**/*.{js,map,ts}')
               .pipe(gulp.dest('dist'));
});

//compiling our SCSS files
gulp.task('styles', function () {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/scss/init.scss')
                //include SCSS and list every "include" folder
               .pipe(sass({
                   errLogToConsole: true,
                   includePaths: [
                       'app/scss/'
                   ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade: true
               }))
               //catch errors
               .on('error', gutil.log)
               //the final filename of our combined css file
               .pipe(concat('styles.css'))
               //where to save our final, compressed css file
               .pipe(gulp.dest('app/css'))
    //notify LiveReload to refresh
    //.pipe(connect.reload());
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function () {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/scss/init.scss')
                //include SCSS includes folder
               .pipe(sass({
                   includePaths: [
                       'app/scss',
                   ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade: true
               }))
               //the final filename of our combined css file
               .pipe(concat('styles.css'))
               .pipe(minifyCSS())
               //where to save our final, compressed css file
               .pipe(gulp.dest('dist/css'));
});

//Watch HTML files
gulp.task('html', function () {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.html')
        //.pipe(connect.reload())
       //catch errors
       .on('error', gutil.log);
});

//Watch JavaScript files
gulp.task('scripts', function () {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.js')
        //.pipe(connect.reload())
       //catch errors
       .on('error', gutil.log);
});

var tsProject = ts.createProject({
    declarationFiles: false,//Don't create declaration files.  We are not creating reusable libraries.
    noExternalResolve: true,//Don't check for valid dependencies while watching
    noImplicitAny: true, //Require all variable types to be declared.
    sortOutput: true,
    module: "amd",//generate amd compatible modules for use with requireJS
    target: 'ES5'
});

var tsProjectDeploy = ts.createProject({
    declarationFiles: false,//Don't create declaration files.  We are not creating reusable libraries.
    noExternalResolve: false,//Make sure all dependencies are present
    noImplicitAny: true, //Require all variable types to be declared.
    sortOutput: true,
    module: "amd",//generate amd compatible modules for use with requireJS
    target: 'ES5'
});

var tsProjectMode = tsProject;

function typescripts() {
    return gulp.src(['app/**/*.ts'])
    .pipe(cached('typescripts'))
    .pipe(plumber())
    .pipe(addsrc('typings/**/*.ts'))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProjectMode, undefined, ts.reporter.fullReporter(true))).js
    .pipe(gulpIgnore.exclude('./*.I.ts'))
    .pipe(ngAnnotate({
        remove: false,
        add: true,
        gulpWarnings: false //typescript removes base path for some reason.  Warnings result that we don't want to see.
    }))
    .pipe(sourcemaps.write('.', { includeContent: false }))
    .pipe(gulp.dest('app'));
}

gulp.task('typescripts', function () {
    // For some reason, not returning the pipe takes less time than if the pipe is returned, for a small project at least.
    // Need to keep experimenting.
    typescripts();
});

function typescriptsmin() {
    // todo: spec.ts not being excluded from min
    return gulp.src(['app/**/*.ts', '!app/**/*.spec.ts', 'app/**/*.I.ts/'])
        //.pipe(cached('typescriptsmin'))
        .pipe(plumber())
        .pipe(addsrc('typings/**/*.ts'))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProjectMode, undefined, ts.reporter.fullReporter(true))).js
        .pipe(gulpIgnore.exclude('./*.I.ts'))
        .pipe(ngAnnotate({
            remove: false,
            add: true,
            gulpWarnings: false //typescript removes base path for some reason.  Warnings result that we don't want to see.
        }))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(sourcemaps.write('.', { includeContent: false }))
        .pipe(gulp.dest('app'));
}

gulp.task('typescripts-min', function () {
    typescriptsmin();
});

gulp.task('typescripts-deploy', function () {
    tsProjectMode = tsProjectDeploy;
    typescripts();
    typescriptsmin();
});

//migrating over all HTML files for deployment
gulp.task('html-deploy', function () {
    //grab everything, which should include htaccess, robots, etc
    gulp.src('app/*')
        .pipe(gulp.dest('dist'));

    //grab any hidden files too
    gulp.src('app/.*')
        .pipe(gulp.dest('dist'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    //grab all of the styles
    gulp.src(['app/css/*.css', '!app/styles/styles.css'])
        .pipe(gulp.dest('dist/styles'));
});

//cleans our dist directory in case things got deleted
gulp.task('clean', function () {
    del('dist');
});

gulp.task('watch', ['connect', 'typescripts', 'typescripts-min', 'scripts'], function () {
    //a list of watchers, so it will watch all of the following files waiting for changes

    // todo: need to do .js file delete on .ts file delete.
    watch('app/**/*.ts', { root: "app" }, ['typescripts', 'typescripts-min']).on('delete', function () {
    });
    //gulp.watch('app/**/*.js', ['scripts']);
    //gulp.watch('app/scss/**', ['styles']);
    //gulp.watch('app/images/**', ['images']);
    watch('app/*.html', { root: "app" }, ['html'])
        .on('end', function () {
            gutil.log('Closing connect server.');
            connect.serverClose();
        });
});

gulp.task('default', ['watch'], function () {
    gutil.log('starting default task');
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', ['clean', 'typescripts-deploy', 'scripts-deploy', 'styles-deploy', 'html-deploy', 'images-deploy'], function () {
});