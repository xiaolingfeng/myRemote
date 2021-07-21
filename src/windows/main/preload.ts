// const {contextBridge,ipcRenderer} = require('electron');
// const {desktopCapturer} = require('electron');
import {contextBridge, desktopCapturer,ipcRenderer} from 'electron'
import chalk from 'chalk';

contextBridge.exposeInMainWorld('electron',{
    startRecord,
    capture
})

function startRecord(videoDom:HTMLVideoElement){
    desktopCapturer.getSources({types:['screen']}).then(async sources=>{
        try{
            // @ts-ignore
            const stream = await navigator.mediaDevices.getUserMedia({
                audio:false,
                video:{
                    mandatory:{
                        chromeMediaSource:'desktop',
                        // chromeMediaSourceId:source.id,
                        minWidth:window.screen.width,
                        maxWidth:window.screen.width,
                        minHeight:window.screen.height,
                        maxHeight:window.screen.height
                    },
                }
            })
            handleStream(stream);
        }catch(e){
            console.log(e);
        }

    })

    function handleStream(stream:MediaStream){
        videoDom.srcObject = stream;
        videoDom.onloadedmetadata = ()=>videoDom.play()
    }
}

function capture(){
    console.log(chalk.blue('EMIT CAPTURE'));
    ipcRenderer.send('capture')
}
