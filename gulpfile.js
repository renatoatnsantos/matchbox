const gulp = require('gulp')
    imagemin = require('gulp-imagemin'),
    clear = require('gulp-clean'),
    concat = require('gulp-concat'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass')
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat')
    connect = require('gulp-connect'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceMap = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    connectPHP  = require('gulp-connect-php');
    browserSync = require('browser-sync').create()


gulp.task('optimize-image' , ()=>{
        gulp.src(['./src/assets/images/*'])
            .pipe(imagemin())
            .pipe(gulp.dest('./dist/assets/images'))
})

gulp.task('replace-html', function() {
    gulp.src(['./src/*.html'])
        .pipe(htmlReplace({
            'css' : './assets/css/all.css',
            'js' : './assets/js/all.js',
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-js' , () =>{
    return gulp.src(['./src/assets/js/**/*.js'])
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(sourceMap.init())
        .pipe(sourceMap.write(['/']))
        .pipe(gulp.dest('./dist/assets/js'))
})

gulp.task('compile-scss',  ()=>{
    return gulp.src(['./src/assets/css/scss/*.scss' , './src/assets/css/**/*.css'])
        .pipe(sass().on('error' ,(err)=>{
            console.log(err)
        }))
        .pipe(cssmin())
        .pipe(concat('all.css'))
        .pipe(sourceMap.init())
        .pipe(sourceMap.write(['/']))
        .pipe(gulp.dest(['./dist/assets/css']))
})


gulp.task('watching' , ()=>{
    gulp.watch(['./src/assets/css/scss/*.scss'] , gulp.series('compile-scss'))
})

gulp.task('copy-files' , gulp.series(gulp.parallel('replace-html' , 'compile-js' , 'compile-scss' , 'optimize-image')), ()=>{
    return gulp.src(['./src/*.html'])
        .pipe(gulp.dest(['dist']))
})

gulp.task('clear-files' , gulp.series('copy-files'), ()=>{
    del('dist')
})

gulp.task('server' , ()=>{
    browserSync.init({
        server : {
            baseDir : 'dist' // O mesmo que http://localhost:3000 ou
            //proxy : 'http://localhost:3000' caso queira usar o gulp em conjunto a outro serv
        }
    })
    gulp.watch('dist/**/*').on('change' , browserSync.reload ) // Responsável pelo live reload da página
})

gulp.task('default' , gulp.series(gulp.parallel('clear-files', 'server' , 'watching')) )