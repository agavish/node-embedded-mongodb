/**
 * Created by adamgavish on 1/26/15.
 */

var gulp = require('gulp')
    , mocha = require('gulp-mocha')
    , bump = require('gulp-bump')
    , git = require('gulp-git')
    , tag_version = require('gulp-tag-version')
    , istanbul = require('gulp-istanbul');

gulp.task('test', function (cb) {
    gulp.src('./lib/node-embedded-mongodb.js')
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src('./test/node-embedded-mongodb_test.js')
                .pipe(mocha({
                    reporter: 'spec',
                }))
                .pipe(istanbul.writeReports()) // Creating the reports after tests runned
                .on('end', cb);
        });
});

gulp.task("bump", function () {
    gulp.src('./package.json')
        .pipe(bump({type: 'patch' }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bumps package version'));
});

gulp.task("default");
