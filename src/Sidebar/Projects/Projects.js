import React, {Component} from 'react';

class Projects extends Component{

    state ={
        expanded: false
    }

    
    
    renderProjects(projects){
        return (
            <>
                {projects.map((project, i) => {
                    return <div className="project" id={project.name}  key={i}>{project.name}</div>
                })}
                <button type="button">Add Project</button>
            </>
        )
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