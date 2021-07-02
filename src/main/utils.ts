import _path from 'path';

export const path = {
    getPreload(name:string){
        console.warn("__dirname",__dirname);
        return _path.resolve(__dirname,`./preload/${name}.js`)
    },
    getPage(name:string){
        return _path.resolve(__dirname,`./${name}.html`)
    }
}
