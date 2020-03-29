import React, {Component} from 'react';
import config from '../config'
import {Link} from 'react-router-dom'
import './AddIssue.css';

class AddIssue extends Component {

	static defaultProps = {
		reloadUser: () => {},
		history: {
			push: () => {}
		},
		userId: "",
		projects: [],
	}

	state ={
		description: "",
		project_id: null,
		status: "Active",
		user_id: this.props.userId
	}

	handleSubmit = event => {
		event.preventDefault();
		const options = JSON.parse(JSON.stringify(config.getOptions('post')))
		options.body = JSON.stringify(this.state)
		fetch(`${config.API}/issues`, options).then(res => {
			if(res.ok){
				this.props.reloadUser()
				this.props.history.push('/')
			}
			return res.statusText
		}).catch(err => console.log(err))

	}
	
	handleChangeContent = event => {
		this.setState({description: event.target.value})
	}

	generateProjectsOptions =() => {
		return this.props.projects.map(project => {return <option value={project.id}  key={project.id}>{project.name}</option>})
	}

	componentDidMount = () => {
		config.checkForAuth(this.props.history)
	}

	setProjectId = event => {
		this.setState({project_id: event.target.value})
	}

	render(){
		config.checkForAuth(this.props.history)
		return (
			<form onSubmit={this.handleSubmit} id="add-issue-form">
				<label htmlFor="projects"> Select a Project</label>
					<select id="projects" onChange={this.setProjectId}> 
						<option>Select a project</option>
						{this.generateProjectsOptions()}
					</select>
				
				<label htmlFor="description">Description of issue:</label><br/>
				<textarea rows="5" cols="60" id="add-note" onChange={this.handleChangeContent} required/><br/>
				<div className="button-wrapper">
					<button type="submit" id="add-issue-button">Add Issue</button>
					<Link to="/" id="cancel">Cancel</Link>
				</div>
			</form>
		)
	}
}

export default AddIssue;
