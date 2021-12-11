const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = (dir) => path.join(__dirname, dir);
console.log('当前运行时:', process.env.VUE_APP_TYPE)
module.exports = {
  publicPath: './',
  lintOnSave: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展webpack 配置，使packages加入编译
  chainWebpack: config => {
    config.module
      .rule("images")
      .test(/\.(jpg|png|gif)$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit:10,
        publicPath: '/img' ,
        outputPath: 'img',
        name: '[name].[hash:8].[ext]',
      })
      .end();
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改他的选项
        return options
      })
  },

  configureWebpack: config => {
    plugins: [
      new webpack.BannerPlugin('前端逗逗飞!'),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: false,
        parallel: true
      })
  ]
  }
}
