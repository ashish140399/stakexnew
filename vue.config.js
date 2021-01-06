module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://stxmainnet.herokuapp.com/',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
