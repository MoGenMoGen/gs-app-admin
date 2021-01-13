const gulp = require('gulp');
const webpack = require('webpack');
const del = require('del');
const ftp = require('gulp-sftp');

// 是上传地址配置，可以在.gitignore中忽略此文件上传，为了安全本地拥有就可以了
const gulpConfig = require('./gulp-config.js');
// 是webpack配置文件
const webpackConfig = require('./build/webpack.prod.conf');
/**
 * 清除生产目录文件
 */
gulp.task('clean', ['upload'], function (callback) {
    console.log('## 清除原来编译的代码')
    del(['.' + gulpConfig.publicPath], callback)
});

/**
 * 编译代码
 */
gulp.task('build', function (callback) {
    console.log('## 代码编译开始')
    webpack(webpackConfig, function (err, state) {
        console.log('## 代码编译完成')
        callback(err)
    })
});

/**
 * 编译代码，自动部署到服务器
 */
gulp.task('upload', function (callback) {
    console.log('## 正在部署到服务器上')
    gulp.src('.' + gulpConfig.publicPath + '**')
        .pipe(ftp(Object.assign(gulpConfig.devDist, {callback})))
});

/**
 * 上传到生产服务器上
 */
gulp.task('prodDist', ['build', 'upload', 'clean'])