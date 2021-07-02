import React,{Component} from 'react';
import ReactDOM from 'react-dom';


class Main extends Component{

    handleClick=()=>{
        console.log('hi hi2');
    }

    render(){
        return (
            <button onClick={this.handleClick}>Start</button>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById('root')
)
