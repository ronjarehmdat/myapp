const lessToScss = require('gulp-less-to-scss');

module.exports = (gulp, src) => {

    return () => {

        return gulp.src(src + '/assets/less/*.less')
            .pipe(lessToScss())
            .pipe(gulp.dest(src + '/assets/scss'));
        ;
    };
};
