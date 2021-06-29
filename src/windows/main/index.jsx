import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import {desktopCapturer} from 'electron';

class Main extends Component{
    constructor(props) {
        super(props);
        this.video=React.createRef()
    }
    handleClick=()=>{
        console.log('hi');
        this.startRecord();
    }

    componentDidMount() {

    }

    startRecord(){
        console.log('startRecord');
        window.electron.startRecord()
    }

    render(){
        return (
            <div>
                <video ref={this.video}/>
                <button onClick={this.handleClick}>Start</button>
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
