import _path from 'path';

export const path = {
    getPreload(name){
        return _path.resolve(__dirname,`@/dist/windows/${name}/preload.js`)
    },
    getPage(name){
        return _path.resolve(__dirname,`@/dist/windows/${name}/index.html`)
    }
}
