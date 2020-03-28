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
            <>
                {this.props.children}
                <main>
                    <Table issues={this.props.issues} userId={this.props.userId} getProjectNameById={this.props.getProjectNameById}/>
                </main>
            </>
        )
    }
}

export default Main;