const path = require('path');
const fs = require('fs');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const dir =  fs.readdirSync(path.resolve(__dirname,'../src/windows'));
const entry = {};
dir.forEach(dirname=>{
    const pathname = path.resolve(__dirname,`../src/windows/${dirname}/preload.ts`);
    try{
        fs.accessSync(pathname);
        entry[dirname] = pathname;
    }catch (e){}
})

const config = {
    entry,
    target:'electron-preload',
    output: {
        filename:'preload/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jpe?g|png|gif|svg|eof|ttf|wof/,
                loader: "file-loader",
            }
        ],
    },
    devtool: 'source-map',
}

module.exports = merge(common,config);
