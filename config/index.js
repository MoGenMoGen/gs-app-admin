// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {

  //网站模块名，例如 http://192.168.0.216:8089/module/app/initlayer.html 中的
  //【views】，默认为views，修改这里的配置的同时，也要同时重命名/src/views的这个文件夹名称
  moduleName:'views',

  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../../',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8095,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
}
