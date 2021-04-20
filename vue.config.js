module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/User': {
        target: 'http://115.28.106.108:8999/User',
        changeOrigin: true,
        pathRewrite:{
          '^/User': ''
        }
      },
      '/SupCar': {
        target: 'http://115.28.106.108:8999/SupCar',
        changeOrigin: true,
        pathRewrite:{
          '^/SupCar': ''
        }
      },
      '/SaleCar': {
        target: 'http://115.28.106.108:8999/SaleCar',
        changeOrigin: true,
        pathRewrite:{
          '^/SaleCar': ''
        }
      }
    }
  }
}