import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../../config'
import './Projects.css'

class Projects extends Component{

    state ={
        expanded: false
    }
    handleDelete = event => {
        const options = JSON.parse(JSON.stringify(config.getOptions('delete')))
        options.body = JSON.stringify({id: parseInt(event.target.id.split(':')[1])})
        fetch(`${config.API}/projects`, options).then(res => res.json()).then(res => console.log(res))
    }

    handleFilter = event => {
        event.preventDefault();
        console.log(event.target.id)
        this.props.filterByProject(parseInt(event.target.id.split(':')[1]))
    }
    
    renderProjects(){
        return (
            <>
                {this.props.projects.map((project, i) => {
                    return (
                        <div className="project"  key={i}><button id={`button-for-project:${project.id}`} className="filter-button" onClick={this.handleFilter}>{project.name}</button>
                            <button onClick={this.handleDelete} className="delete-button" id={`${project.name}:${project.id}`}>
                                Delete
                            </button>
                        </div>
                    )
                })}
                <Link to="/AddProject" className="sim-button">Add Project</Link>
            </>
        )
    }

    handleClick = () => {
        const newState = !this.state.expanded;
        this.setState({expanded: newState})
    }

    render(){
        return (
            <>
                <div id="projects" onClick={this.handleClick}>
                    <span id="block">Projects</span>
                </div>
                {
                    this.state.expanded && this.renderProjects() 
                }
            </>
        )
    }
}

export default Projects;