const rename = require("gulp-rename"),
    plumber = require("gulp-plumber");

module.exports = (gulp, src, dest) => {

    return () => {
      
        return gulp
            .src(src)
            .pipe(plumber())
            .pipe(gulp.dest(dest))
    };
};
