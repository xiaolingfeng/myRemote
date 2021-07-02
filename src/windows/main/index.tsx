import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import {desktopCapturer} from 'electron';

class Main extends Component{
    constructor(props:any) {
        super(props);
        this.video=React.createRef()
    }

    video

    handleRecord=()=>{
        globalThis.electron.startRecord(this.video.current)
    }

    handleCapture=()=>{
        console.log('capture test');
        globalThis.electron.capture()
    }

    componentDidMount() {

    }

    render(){
        return (
            <div>
                <video ref={this.video}/>
                <button onClick={this.handleRecord}>录屏</button>
                <button onClick={this.handleCapture}>截图</button>
            </div>
        )
    }
}

const root = document.getElementById('root');

console.log('root',root);

ReactDOM.render(
    <Main/>,
    root
)
