const path = require('path');
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = { 
    devServer:{
        host:'0.0.0.0',
        public:'192.168.101.16:8080'
    },  
    chainWebpack:(config)=> {
       config.resolve.alias
          .set('@',resolve('./src'))
          .set('components',resolve('./src/components'))
          .set('common',resolve('./src/common'))
          .set('views',resolve('src/views'))
          .set('assets',resolve('src/assets'))
          .set('network',resolve('src/network')) 
    }
}

