const gulp = require('gulp')
    imagemin = require('gulp-imagemin')
    clear = require('gulp-clean')
    concat = require('gulp-concat')
    htmlReplace = require('gulp-html-replace')
    uglify = require('gulp-uglify')
    sass = require('gulp-sass')
    usemin = require('gulp-usemin')
    cssmin = require('gulp-cssmin')
    browserSync = require('browser-sync')
    concat = require('gulp-concat')
    connect = require('gulp-connect')
    delele = require('del')
    autoprefixer = require('gulp-autoprefixer')
    sourceMap = require('gulp-sourcemaps')
    rename = require('gulp-rename')
    connectPHP  = require('gulp-connect-php')
    browserSync = require('browser-sync').create()


gulp.task('compile-scss' , ()=>{
    return gulp.src(['./src/assets/css/scss/*.scss'])
        .pipe(sourceMap.init())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(sourceMap.write('/'))
        .pipe(gulp.dest(['./src/assets/css']))
})

gulp.task('watching' , ()=>{
    gulp.watch(['./src/assets/css/scss/*.scss'] , gulp.series(['compile-scss']) )
})

gulp.task('server' , ()=>{
    browserSync.init({
        server : {
            baseDir : 'src' // O mesmo que http://localhost:3000 ou
            // proxy : 'http://localhost:3000', // caso queira usar o gulp em conjunto a outro serv
        }
    })
    gulp.watch('src/**/*').on('change' , browserSync.reload ) // Responsável pelo live reload da página
})

gulp.task('default' , gulp.series(gulp.parallel(['server' , 'watching'])))

