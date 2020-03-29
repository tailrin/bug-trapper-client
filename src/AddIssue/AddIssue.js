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
		fetch(`${config.API}/issues`, options).then(res => res.json()).then(res => {
			console.log(res)
			this.props.reloadUser()
			this.props.history.push(`/issues/${res.id}`)
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

	validateFields = () => {
		return this.state.project_id === null || this.state.description.length < 50
	}

	render(){
		config.checkForAuth(this.props.history)
		return (
			<form onSubmit={this.handleSubmit} id="add-issue-form">
				<label htmlFor="select-project"> Select a Project</label>
					<select id="select-project" onChange={this.setProjectId}> 
						<option>Select a project</option>
						{this.generateProjectsOptions()}
					</select>
				
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
