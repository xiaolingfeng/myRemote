const {Notification,contextBridge,ipcRenderer} = require('electron');
const {desktopCapturer} = require('electron');

contextBridge.exposeInMainWorld('electron',{
    startRecord
})

function startRecord(videoDom){
    desktopCapturer.getSources({types:['window','screen']}).then(async sources=>{
        for(const source of sources){
            if(source.name === 'Screen 1'){
                try{
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
                            }
                        }
                    })
                    handleStream(stream);
                }catch(e){
                    console.log(e);
                }
            }
        }
    })

    function handleStream(stream){
        videoDom.srcObject = stream;
        videoDom.onloadedmetadata = e=>videoDom.play()
    }
}

function startRecordByMediaDevices(){

    function handleStream(stream){
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.onloadedmetadata = e=>video.play()
    }
    navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{
            mandatory:{
                chromeMediaSource:'desktop',
                chromeMediaSourceId: sourceId,
                maxWidth:window.screen.width,
                maxHeight: window.screen.height
            }
        }
    }).then(stream=>{
        console.log(stream)
        handleStream(stream)
    })
}
