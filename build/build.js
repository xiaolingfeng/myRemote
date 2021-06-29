const webpack = require('webpack');
const common = require('./webpack.common');
const {merge} = require('webpack-merge');

const renderer = merge(common,require('./webpack.renderer'));
const main = merge(common,require('./webpack.main'));
const preload = merge(common,require('./webpack.preload'));
const child_process = require('child_process');

function compile(config,callback = ()=>{}){
    const compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
            return
        }
        console.log(stats.toString({colors: true}))
        compiler.close(callback);
    });
}

webpack([
    renderer,preload,main
],(stats)=>{
    console.log(stats.toString({colors: true}));
    child_process.exec('npm start')
})

compile(renderer,()=>{
    compile(main);
    compile(preload);
});

