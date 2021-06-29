const path = require('path');


module.exports = {
    mode:'development',
    devServer: {
        writeToDisk:true,
        hot:true
    },
    output:{
        publicPath:'./',
        path: path.resolve(__dirname, "../dist"),
    },
    resolve:{
        alias: {
            "@": path.resolve(__dirname,'../src'),
            "@root": path.resolve(__dirname, '../'),
        }
    },
    devtool: 'source-map'
}
