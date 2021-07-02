const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const fs = require('fs');

const dir =  fs.readdirSync(path.resolve(__dirname,'../src/windows'));
console.log(dir);
const entry = {};
const htmlPlugins = [];
dir.forEach(dirname=>{
    const pathname = path.resolve(__dirname,'../src/windows',dirname);
    const stat = fs.statSync(pathname);
    if(stat.isDirectory()){
        entry[dirname] = path.resolve(__dirname,`../src/windows/${dirname}/index.tsx`);
    }
    htmlPlugins.push(new HtmlWebpackPlugin({
        title: dirname,
        // filename: `windows/[name]/index.html`,
        filename: `${dirname}.html`,
        template: path.resolve(__dirname, `../src/windows/${dirname}/index.html`),
        // publicPath:'../../',
        // inject: 'body',
        // cache: false,
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
        filename:'scripts/[name].js',
        // clean:true
    },
    module: {
        rules: [
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
    plugins: [
        new MiniCssExtractPlugin({
            filename:'style/[name].css'
        }),
    ].concat(htmlPlugins),
}

module.exports = merge(common,config);
