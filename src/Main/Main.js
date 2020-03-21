import React, {Component} from 'react';
import Table from './Table/Table'
import './Main.css';

class Main extends Component {

    render(){
        return (
            <main>
                <Table issues={this.props.issues}/>
            </main>
        )
    }
}

export default Main;