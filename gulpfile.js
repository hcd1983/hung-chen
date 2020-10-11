var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var svgSprite = require('gulp-svg-sprite');
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var webpack = require('webpack-stream');

gulp.task('browser-sync', function() {
    browserSync.init({
        // reloadDelay: 500,
        proxy: "127.0.0.1/hungchen"
    });

    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('src/**', ['js-rebuild']);
    gulp.watch('svg/*.svg', ['svg-rebuild']);
    gulp.watch('pug/*.pug', ['pug-rebuild']);
    // browserSync.watch(['*.html', '*.php']).on('change', browserSync.reload);
});

gulp.task('babel', function() {
    return gulp.src('src/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-rebuild', ['babel'], browserSync.reload);

gulp.task('pug', function buildHTML() {
    return gulp.src('pug/*.pug')
        .pipe(pug({
            // pretty: true
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('pug-rebuild', ['pug'], browserSync.reload);

// gulp.task('sass', function() {
//     gulp.src('sass/*.scss')
//         .pipe(compass({
//             config_file: './config.rb',
//             sass: 'sass',
//             css: 'stylesheets'
//         }))
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
//             cascade: false
//         }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('stylesheets'))
//         .pipe(browserSync.stream());
// });

gulp.task('sass', function() {
    return gulp.src('sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['node_modules/foundation-sites/scss'],
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: [
            'last 2 versions', 'ie >= 9', 'and_chr >= 2.3'
        ],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('stylesheets'))
    .pipe(browserSync.stream());
});

// FIXME: 待修改pug react vue等等
// gulp.task('copy', function() {
//     gulp.src([
//         'css/**',
//         'fonts/**',
//         'images/**',
//         'js/**',
//         'mobile/**',
//         'stylesheets/*.css',
//         '*.php'
//     ], {
//         base: './'
//     })
//     .pipe(changed('public'))
//     .pipe(gulp.dest('public'));
// });

gulp.task('svg', function() {
    return gulp.src('svg/*.svg').pipe(svgSprite({
        mode: {
            defs: {
                dest: './',
                sprite: "images/all.defs.svg",
                render: {
                    css: {
                        dest: 'stylesheets/svg-sprites-dims.css'
                    }
                },
                inline: true,
                example: false
            }
        }
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('svg-rebuild', ['svg'], browserSync.reload);

gulp.task('default', ['svg', 'sass', 'babel', 'pug', 'browser-sync']);
