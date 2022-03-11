var del = require("del");
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');

module.exports = function (gulp, iconsSrcPath, imagesDistPath, lessDistPath, cssDistPath, imagesRelPath) {

    var task = function () {

        var imgFileName = 'dna-theme-sprite.png',
            imgFilePath = imagesDistPath + imgFileName,
            lessFileName = 'dna-theme-sprite.less',
            lessFilePath = lessDistPath + lessFileName,
            cssFileName = 'dna-theme-sprite.css',
            cssFilePath = cssDistPath + cssFileName;

        return del([imgFilePath, lessFilePath, cssFilePath]).then(function () {

            var spriteLessData = gulp.src(iconsSrcPath).pipe(spritesmith({
                imgName: imgFileName,
                cssName: lessFileName,
                imgPath: imagesRelPath + imgFileName
            }));

            var spriteCssData = gulp.src(iconsSrcPath).pipe(spritesmith({
                imgName: imgFileName,
                cssName: cssFileName,
                imgPath: imagesRelPath + imgFileName
            }));

            var imgStream = spriteLessData.img
                .pipe(buffer())
                .pipe(gulp.dest(imagesDistPath));

            var lessStream = spriteLessData.css
                .pipe(gulp.dest(lessDistPath));

            var cssStream = spriteCssData.css
                .pipe(gulp.dest(cssDistPath));

            return merge(imgStream, lessStream, cssStream);
        });
    };

    return task;
};
