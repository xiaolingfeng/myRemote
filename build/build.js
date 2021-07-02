const webpack = require('webpack');

const renderer = require('./webpack.renderer');
const main = require('./webpack.main');
const preload = require('./webpack.preload');
const child_process = require('child_process');

const isWatch = process.argv.includes('--watch')

const compiler = webpack([
    renderer,
    preload,
    main
])

function compilerCallback(err,stats){
    if(err){
        console.error(err);
    }
    console.log(stats.toString({colors: true}));
}

if(isWatch){
    console.log('watching-----------------------')
    compiler.watch({
        aggregateTimeout:300,
        poll:undefined,
        ignored:/node_modules/
    },compilerCallback)
}else{
    compiler.run(compilerCallback)
}
