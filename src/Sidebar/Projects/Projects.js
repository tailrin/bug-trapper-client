import React, {Component} from 'react';

class Projects extends Component{

    state ={
        expanded: false
    }
    
    renderProjects(projects){
        return projects.map(project => {
            return <div id={project.name}>{project.name}</div>
        })
    }

    handleClick = () => {
        const newState = !this.state.expanded;
        this.setState({expanded: newState})
    }

    render(){
    return <div id="projects" onClick={this.handleClick}>Projects
        {
            this.state.expanded && this.renderProjects(this.props.projects)
        }
    </div>
    }
}

export default Projects;