
module.exports = {
  devServer: {
    proxy: {
      '/get_token': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/get_token': ''
        }
      }
    }
  }
}
