
module.exports = {
  devServer: {
    proxy: {
      '/get_token': {
        target: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/get_token': ''
        }
      }
    }
  }
}
