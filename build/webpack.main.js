const fs = require('fs');
const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const config = {
    entry: path.resolve(__dirname,'../src/main/index.ts'),
    output: {
        filename:'main.js'
    },
    target:'electron-main'
}

module.exports = merge(common,config)
