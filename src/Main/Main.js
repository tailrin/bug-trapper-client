import React, {Component} from 'react';
import Table from './Table/Table';
import './Main.css';

class Main extends Component {
    static defaultProps = {
        issues: [],
        userId: null
    }
    getById =(id) => {
        return this.props.issues.filter(issue => issue.id === id)[0]
    }

    render(){
        return (
            <main>
                <Table issues={this.props.issues}/>
            </main>
        )
    }
}

export default Main;