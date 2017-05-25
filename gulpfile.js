'use strict';
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    rigger = require("gulp-rigger"),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: {
        pug: 'src/pug/*.pug',
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/sass/main.scss',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        pug: 'src/**/*.pug',
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.*',
        img: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server : {
        baseDir: "./build"
    },
    tunnel: true,
    host: "localhost",
    port: 3000,
    logPrefix: "Poehali"
}

gulp.task('browser-sync', function() {
    browserSync(config);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass({errLogToConsole: true}))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build'
]);

gulp.task('watch', function () {
    watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
