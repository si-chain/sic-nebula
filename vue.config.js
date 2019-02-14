const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: process.env.BASE_URL,
  devServer: {
    proxy: {
      '/uec': {
        target: 'https://uec.17doubao.com',
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip'
        })
      )
    }
  },
  productionSourceMap: false
}