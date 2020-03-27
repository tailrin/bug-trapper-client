import React, {Component} from 'react';
import './Sidebar.css'
import Projects from "./Projects/Projects"

class Sidebar extends Component {

    
    render(){
        return (
            <div className="sidebar">
                <Projects projects={this.props.projects} filterByProject={this.props.filterByProject}/>
            </div>
        )
    }
}

export default Sidebar;