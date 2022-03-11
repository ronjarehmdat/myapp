const watch = require("gulp-watch");

module.exports = (gulp, filesGlob, onChangedFn) => () => watch(filesGlob, () => gulp.start(onChangedFn)); 