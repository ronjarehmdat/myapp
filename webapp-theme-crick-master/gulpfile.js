const pkg = require('./package.json'),
    process = require('process'),
    gulp = require('gulp'),
    path = require('path');

const TASK_DIR = './build/tasks/',
    SRC_DIR = './src',
    DIST_DIR = './dist',
    ASSETS_DIR = `${SRC_DIR}/assets`;

// *** Tasks ***
const TASK_CLEAN = require('./' + path.join(TASK_DIR, 'clean')),
    TASK_COPY = require('./' + path.join(TASK_DIR, 'copy')),
    TASK_SPRITE = require('./' + path.join(TASK_DIR, 'sprite')),
    TASK_TRANSPILE_SCSS = require('./' + path.join(TASK_DIR, 'transpile-scss')),
    TASK_WATCH = require('./' + path.join(TASK_DIR, 'watch'));

gulp.task('clean', TASK_CLEAN([DIST_DIR]));
gulp.task('copy', TASK_COPY(gulp, ['./package.json', './README.md', `${SRC_DIR}/**/*`, `!${ASSETS_DIR}/{icons,icons/**/*}`], DIST_DIR));
gulp.task('sprite:svgs', TASK_SPRITE(gulp, [`${ASSETS_DIR}/icons/**/*.svg`], `${ASSETS_DIR}/images`, `${ASSETS_DIR}/scss`, '../images/'));
gulp.task('transpile:scss', TASK_TRANSPILE_SCSS(gulp, [`${ASSETS_DIR}/scss/dna-theme.scss`], `${DIST_DIR}/assets/css`));
gulp.task('transpile-isolated:scss', TASK_TRANSPILE_SCSS(gulp, [`${ASSETS_DIR}/scss/dna-theme-isolated.scss`], `${DIST_DIR}/assets/css`));
gulp.task('transpile-grid18:scss', TASK_TRANSPILE_SCSS(gulp, [`${ASSETS_DIR}/scss/dna-theme-grid18.scss`], `${DIST_DIR}/assets/css`));
gulp.task('transpile-grid18-isolated:scss', TASK_TRANSPILE_SCSS(gulp, [`${ASSETS_DIR}/scss/dna-theme-grid18-isolated.scss`], `${DIST_DIR}/assets/css`));
gulp.task('watch', TASK_WATCH(gulp, `${SRC_DIR}/**/*`, 'build'));
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');

    return gulp.src('./dist/assets/css/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task("build",
	gulp.series('clean', 'copy', 'transpile:scss', 'transpile-isolated:scss', 'transpile-grid18:scss', 'transpile-grid18-isolated:scss', 'autoprefixer')
);
