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
    module:{
        rules:[
            {
                test: /\.[tj]sx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            // cacheDirectory:true,
                            presets:[
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns:'usage',
                                    }
                                ],
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            plugins:[
                                // ['@babel/plugin-transform-runtime',{corejs:3,helpers:true,regenerator:true,useESModules:true}]
                            ]
                        }
                    },
                ],
                exclude: /node_modules/
            },
        ]
    },
    node:{
        __dirname: false
    },
    resolve:{
        extensions: ['.ts','.tsx','.js','.jsx','.json'],
        modules:[path.resolve(__dirname,'../src'),'node_modules'],
        alias: {
            "@": path.resolve(__dirname,'../src'),
            "@root": path.resolve(__dirname, '..'),
        }
    },
    devtool: 'source-map'
}
