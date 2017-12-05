const gulp = require('gulp');
const webpack = require('webpack');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');
const del = require('del');
const fs = require('fs');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const debug = require('gulp-debug');
const gulpUtil = require('gulp-util');
const uglifycss = require('gulp-uglifycss');

/**
 * Webpack Configurations
 *
 * Dev
 *  - Doesn't minify output
 *  - Sets node environment variable to development
 *
 * Prod
 *  - Minifies output
 *  - Sets node environment variable to production
 */
const webpack_dev = require('./webpack.config.js');
const webpack_prod = require('./webpack.config.prod.js');

/**
 * Tasks
 */

/**
 * Clean up dist/ directory
 *
 * Parent tasks:
 * - build
 */
gulp.task('clean', () => del([
    'dist/*'
]));


/**
 * Copy Files
 *
 * Parent Tasks:
 *  - dev-build
 *  - Build
 */
// copy index, about html files
gulp.task('copy-html', () => gulp.src(['src/index.html'])
    .pipe(debug({ title: 'copying:' }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload()));
// copy data folder
gulp.task('copy-data', () => gulp.src('./src/data/**/*')
    .pipe(debug({ title: 'copying:' }))
    .pipe(gulp.dest('./dist/data')));
// copy fonts
gulp.task('copy-fonts', () => gulp.src('./src/fonts/**/*')
    .pipe(debug({ title: 'copying:' }))
    .pipe(gulp.dest('./dist/fonts')));
// copy favicons
gulp.task('copy-favicons', () => gulp.src('./src/favicons/**/*')
    .pipe(debug({ title: 'copying:' }))
    .pipe(gulp.dest('./dist/')));
// copy images
gulp.task('copy-img', () => gulp.src('./src/img/**/*')
    .pipe(debug({ title: 'copying:' }))
    .pipe(gulp.dest('./dist/img/')));

gulp.task('copy', gulp.parallel('copy-html', 'copy-data', 'copy-fonts', 'copy-favicons', 'copy-img'));

/**
 * Build Stylesheets, copy
 *
 * Parent Tasks:
 *  - dev-build
 *  - build
 */
gulp.task('sass', () => gulp.src('src/sass/app.scss')
    .pipe(debug({ title: 'processing stylesheet:' }))
    .pipe(sass.sync()
        .on('error', sass.logError))
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload()));


/*
 * Build Javascript (dev)
*
 * Parent Tasks:
 *  - dev-build
 */
gulp.task('webpack-dev', done => webpack(webpack_dev, (error) => {
    let pluginError;
    if (error) {
        pluginError = new gulpUtil.PluginError('webpack', error);
        if (done) {
            done(pluginError);
        } else {
            gulpUtil.log('[webpack]', pluginError);
        }
        return;
    }
    if (done) {
        livereload.reload('./dist/app.bundle.js');
        done();
    }
}));

/*
 * Build Javascript (production)
 *
 * Parent Tasks:
 *  - build
 */
gulp.task('webpack-prod',
    done => webpack(webpack_prod,
    (error) => {
        let pluginError;
        if (error) {
            pluginError = new gulpUtil.PluginError('webpack', error);
            if (done) {
                done(pluginError);
            } else {
                gulpUtil.log('[webpack]', pluginError);
            }
            return;
        }
        if (done) {
            done();
        }
    }
));

/*
 * Watch Files
 *
 * Parent tasks:
 * - watch
 */
gulp.task('watch-files', () => {
    livereload.listen();
    gulp.watch('src/js/**/*.js', gulp.parallel('webpack-dev'));
    gulp.watch('src/js/**/*.jsx', gulp.parallel('webpack-dev'));
    gulp.watch('src/js/**/*.json', gulp.parallel('webpack-dev'));
    gulp.watch('src/sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('copy-html'));
    gulp.watch('src/data/**/*', gulp.parallel('copy-data'));
    gulp.watch('src/fonts/**/*', gulp.parallel('copy-fonts'));
    gulp.watch('src/favicons/**/*', gulp.parallel('copy-favicons'));
    gulp.watch('src/img/**/*', gulp.parallel('copy-img'));
});


/*
 * Linting
 *
 * - Must be run manually
 */
gulp.task('lint-js', done =>
    // Via CLI:
    // eslint --ext .js,.jsx src/js/** --ignore-pattern '/lib/' --ignore-pattern '*.json'
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    gulp.src([
        'src/js/**/*.js',
        'src/js/**/*.jsx',
        '!node_modules/**',
        '!src/js/lib/**',
        '!*.json'
    ])
        .pipe(debug({ title: 'linting js :' }))
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({
            fix: true
        }))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError())
        .on('end', () => {
            done();
        })
);
gulp.task('lint-css', () =>
    // Command line to lint:
    // stylelint "src/sass/*.scss"
    // Command line command to format:
    // stylefmt -r "src/sass/*.scss"
    gulp.src(['src/sass/*.scss', '!src/sass/lib/**'])
        .pipe(debug({ title: 'linting css :' }))
        .pipe(gulpStylelint({
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
);

// lint code
gulp.task('lint', gulp.parallel('lint-js', 'lint-css'));

/*
 * Development Tasks
 */
// build for development (skips some steps, like 'clean', 'make-downloads')
gulp.task('dev-build', gulp.series('sass', 'webpack-dev', 'copy'));
// alias
gulp.task('default', gulp.parallel('dev-build'));

/**
 * Utilities
 */
// for active development
gulp.task('watch', gulp.parallel('default', 'watch-files'));

/**
 * Production Tasks
 */
// makes clean, minified production build in /dist
gulp.task('build', gulp.series('clean', 'sass', 'webpack-prod', 'copy'));


