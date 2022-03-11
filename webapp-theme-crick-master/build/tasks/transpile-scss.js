const sass = require('gulp-sass');
sass.compiler = require('sass');

module.exports = (gulp, src, dest) => {

    return () => {

        return gulp.src(src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(dest));
    };
};
