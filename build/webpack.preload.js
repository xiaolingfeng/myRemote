const path = require('path');
const fs = require('fs');

const dir =  fs.readdirSync(path.resolve(__dirname,'../src/windows'));
const entry = {};
dir.forEach(dirname=>{
    const pathname = path.resolve(__dirname,`../src/windows/${dirname}/preload.js`);
    try{
        fs.accessSync(pathname);
        entry[dirname] = pathname;
    }catch (e){}
})

const config = {
    entry,
    target:'electron-preload',
    output: {
        filename:'windows/[name]/preload.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
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
                test: /\.jpe?g|png|gif|svg|eof|ttf|wof/,
                loader: "file-loader",
            }
        ],
    },
    devtool: 'source-map',
}

module.exports = config;
