const path = require('path')

module.exports = {
  configureWebpack: (config) => {
    config.resolve.alias = {
      IMAGES: path.resolve(__dirname, './src/img')
    }
  }
}
