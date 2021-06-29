const fs = require('fs');
const path = require('path');

const mainDir = path.resolve(__dirname, '../src/main')
const files = fs.readdirSync(mainDir)

// const entry = {};
/*files.forEach(dirname => {
    const pathname = path.resolve(mainDir,dirname);
    const stat = fs.statSync(pathname);
    if(stat.isFile()){
        entry[path.parse(pathname).name] = pathname;
    }
})*/

module.exports = {
    entry: path.resolve(__dirname,'../src/main/index.js'),
    output: {
        filename:'main.js'
    },
    target:'electron-main'
}
