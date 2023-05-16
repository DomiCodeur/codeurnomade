module.exports = {
  devServer: {
    proxy: {
      '/get_token': {
        target: process.env.NODE_ENV === 'production' ? 'https://your-vercel-function-url.vercel.app' : 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/get_token': ''
        }
      }
    }
  }
}
