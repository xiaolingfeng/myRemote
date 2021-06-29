/*const {app,BrowserWindow,Notification,ipcMain} =  require('electron');*/
// const path = require('path');

import {app,BrowserWindow,Notification,ipcMain} from 'electron';

import { path } from './utils';

function createWindow(name){
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload:path.getPreload('main'),
            contextIsolation:true
        }
    })
    win.center();
    win.setTitle('这是一个栗子')
    win.setBackgroundColor('#fee');
    win.loadFile(path.getPage('main'))
}

app.whenReady().then(res=>{
    createWindow();
})

app.on('window-all-closed', function (){
    if(process.platform !== 'darwin') app.quit();
})
