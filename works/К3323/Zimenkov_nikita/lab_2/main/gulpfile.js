const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

// Задача для минификации JS
gulp.task('minify-js', function() {
    return gulp.src('src/*.js') // Исходные JS файлы
        .pipe(uglify())
        .pipe(gulp.dest('dist/js')) // Минифицированные файлы
        .pipe(browserSync.stream());
});

// Задача для минификации CSS
gulp.task('minify-css', function() {
    return gulp.src('src/*.css') // Исходные CSS файлы
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css')) // Минифицированные файлы
        .pipe(browserSync.stream());
});

// Задача для запуска локального сервера и слежения за изменениями
gulp.task('serve', function() {
    browserSync.init({
        server: "./" // Корневая директория для сервера
    });

    gulp.watch('src/*.js', gulp.series('minify-js')); // Слежение за JS
    gulp.watch('src/*.css', gulp.series('minify-css')); // Слежение за CSS
    gulp.watch("*.html").on('change', browserSync.reload); // Перезагрузка при изменении HTML
});

// Задача по умолчанию
gulp.task('default', gulp.series('minify-js', 'minify-css', 'serve'));
