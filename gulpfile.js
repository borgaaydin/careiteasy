'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var nano = require('gulp-cssnano');
var modernizr = require('gulp-modernizr');
var stripCssComments = require('gulp-strip-css-comments');

gulp.task('modernizr', function() {
    gulp.src('./js/*.js')
        .pipe(modernizr())
        .pipe(gulp.dest("public/js"));
});


gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify-css', function() {
    return gulp.src('./css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('copyPhp', function() {
    // copy any html files in source/ to public/
    gulp.src('./*.php').pipe(gulp.dest('public'));
    gulp.src('./js/*.js').pipe(gulp.dest('public/js'));
});

gulp.task('copyfonts', function() {
    // copy any html files in source/ to public/
    gulp.src('./fonts/*.*').pipe(gulp.dest('public/fonts'));
});

gulp.task('copyImg', function() {
    // copy any html files in source/ to public/
    gulp.src('./img/**/*.*').pipe(gulp.dest('public/img'));
});

gulp.task('default', function () {
    gulp.src('./*.html').pipe(gulp.dest('public'));
    gulp.src('./js/*.js').pipe(gulp.dest('public/js'));
    gulp.src('./img/**/*.*').pipe(gulp.dest('public/img'));
    gulp.src('./fonts/**/*.*').pipe(gulp.dest('public/fonts'));

    return gulp.src('./sass/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(uncss({
            html: ['index.html', 'landingPage.html', 'http://localhost:8888/careiteasy/'],
            ignore: [
                ".animated",
                ".hinge",
                ".fadeInRightBig",
                /.*noTouch.*/
            ]
        }))
        .pipe(stripCssComments({preserve: false}))
        .pipe(nano())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});