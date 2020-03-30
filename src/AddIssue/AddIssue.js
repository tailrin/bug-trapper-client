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
		user_id: this.props.userId,
		title: ""
	}

	///////////////Event Handlers////////////////

	handleSubmit = event => {
		event.preventDefault();
		const options = JSON.parse(JSON.stringify(config.getOptions('post')))
		options.body = JSON.stringify(this.state)
		fetch(`${config.API}/issues`, options).then(res => res.json()).then(res => {
			console.log(res)
			this.props.reloadUser()
			this.props.history.push(`/issues/${res.id}`)
		}).catch(err => console.log(err))

	}

	handleChangeContent = event => {
		this.setState({description: event.target.value})
	}

	handleProjectChange = event => {
		this.setState({project_id: event.target.value})
	}

	handleTitleChange = event => {
		this.setState({title: event.target.value})
	}

	//////////////////Content Generation Methods//////////////////

	generateProjectsOptions =() => {
		return this.props.projects.map(project => {return <option value={project.id}  key={project.id}>{project.name}</option>})
	}

	///////////////Input Validation Methods////////////////

	validateDescription = () => {
		return this.state.description.length < 50
	}

	validateProject = () => {
		return this.state.project_id === null
	}

	validateFields = () => {
		return this.state.project_id === null || this.state.description.length <50
	}

	////////////////Life cycle methods/////////////////

	componentDidMount = () => {
		config.checkForAuth(this.props.history)
	}

	render(){
		config.checkForAuth(this.props.history)
		return (
			<form onSubmit={this.handleSubmit} id="add-issue-form">
				{this.validateProject() && <p className="error">Project must be selected</p>}
				<label htmlFor="select-project" id="label-project"> Select a Project:
					<select id="select-project" onChange={this.handleProjectChange}> 
						<option>Select a project</option>
						{this.generateProjectsOptions()}
					</select>
				</label>
				<label htmlFor="title" id="label-title">Title of Issue: 
					<input type="text" id="title" onChange={this.handleTitleChange}/>
				</label>
				{this.validateDescription() && <p className="error">Description must be more than 50 characters</p>}
				<label htmlFor="description">Description of issue:</label><br/>
				<textarea id="add-note" onChange={this.handleChangeContent} required/><br/>
				<div className="button-wrapper">
					<button type="submit" id="add-issue-button" disabled={this.validateFields()}>Add Issue</button>
					<Link to="/" id="cancel">Cancel</Link>
				</div>
			</form>
		)
	}
}

export default AddIssue;
