/*const {app,BrowserWindow,Notification,ipcMain} =  require('electron');*/
// const path = require('path');

import {app,BrowserWindow,screen,ipcMain} from 'electron';
import { path } from './utils';

function createWindow(){
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

ipcMain.on('capture',capture);

function capture(){
    const displays = screen.getAllDisplays();
    displays.map(display=>{
        let captureWin = new BrowserWindow({
            fullscreen:true,
            width:display.bounds.width,
            height:display.bounds.height,
            x:display.bounds.x,
            y:display.bounds.y,
            transparent:true,
            frame:false,
            movable:false,
            resizable:false,
            enableLargerThanScreen:false,
            hasShadow:false
        })

        app.dock.hide()
        captureWin.setAlwaysOnTop(true,'screen-saver');
        captureWin.setVisibleOnAllWorkspaces(true);
        captureWin.setFullScreenable(false);
        captureWin.show();
        app.dock.show();
        captureWin.setVisibleOnAllWorkspaces(false);
        // captureWin.loadFile()
    })
}

app.whenReady().then(()=>{
    createWindow();
})

app.on('window-all-closed', function (){
    if(process.platform !== 'darwin') app.quit();
})
