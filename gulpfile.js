const {src, dest, series, watch}=require('gulp');
const concat =require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync=require('browser-sync').create();

//создаем таск для стилей

const styles=() =>{
    return src('src/style/**/*.css')
    .pipe(concat('style.css'))
    .pipe(autoPrefixer('last 5 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist'))
}

//создаем таск для html
const htmlMinify=()=>{
    return src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'))
}

const watchFile=()=>{
    browserSync.init({
        server:{
            baseDir:'dist'
        }
    });
}
//экспорт тасков
watch('src/**/*.html',htmlMinify);
watch('src/style**/*.css',styles);
//exports.styles=styles;
//exports.html=htmlMinify;
exports. default=series(styles,htmlMinify, watchFile);
