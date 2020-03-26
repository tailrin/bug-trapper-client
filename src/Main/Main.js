import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import Table from './Table/Table'
import './Main.css';

class Main extends Component {

    render(){
        return (
            <main>
                <Table issues={this.props.issues}/>
                <Link to='/AddFolder'>Add Folder</Link>
            </main>
        )
    }
}

export default Main;