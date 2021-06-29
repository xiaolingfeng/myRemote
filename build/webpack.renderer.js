const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

const dir =  fs.readdirSync(path.resolve(__dirname,'../src/windows'));
const entry = {};
const htmlPlugins = [];
dir.forEach(dirname=>{
    const pathname = path.resolve(__dirname,'../src/windows',dirname);
    if(fs.statSync(pathname).isDirectory()){
        entry[dirname] = path.resolve(__dirname,`../src/windows/${dirname}/index.jsx`);
    }
    htmlPlugins.push(new HtmlWebpackPlugin({
        title: dirname,
        filename: `windows/[name]/index.html`,
        template: path.resolve(__dirname, `../src/windows/${dirname}/index.html`),
        publicPath:'../../',
        inject: 'body',
        cache: false,
        chunks:[dirname],
        meta:{
            'viewport':'width=device-width,initial-scale=1,user-scalable=no',
            'Content-Security-Policy':"default-src 'self'; script-src 'self'",
            'X-Content-Security-Policy':"default-src 'self'; script-src 'self'"
        }
    }))
})

const config = {
    entry,
    target:'electron-renderer',
    output: {
        filename:'windows/[name]/index.js',
        clean:true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css|less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.jpe?g|png|gif|svg|eof|ttf|wof/,
                loader: "file-loader",
            }
        ],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname),
            "@root": path.resolve(__dirname, '../../'),
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'windows/[name]/index.css'
        }),
        /*new CleanWebpackPlugin(),*/
    ].concat(htmlPlugins),
}

module.exports = config;
