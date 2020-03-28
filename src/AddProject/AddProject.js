import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import './AddProject.css';

class AddProject extends Component {
	state= {
		name: "",
		user_id: this.props.userId
	}
	handleSubmit = event => {
		event.preventDefault();
		const options = JSON.parse(JSON.stringify(config.getOptions('post')))
		options.body = JSON.stringify(this.state)
		fetch(`${config.API}/projects`, options).then(res => res.json()).then(res => {
			console.log(res)
			this.props.reloadUser()
			this.props.history.push('/')
		})
	}

	componentDidMount = () => {
		config.checkForAuth(this.props.history)
	}

	handleInput = event => {
		this.setState({name: event.target.value})
	}

	render(){
		config.checkForAuth(this.props.history)
		return (
			<form id="add-project-form" onSubmit={this.handleSubmit}>
				<label htmlFor="name" >Project Name:</label><br/>
				<input type="text" required id="name" onChange={this.handleInput}/>
				<div className="button-wrapper">
					<button type="submit" id="add-project-button">Add Project</button>
					<Link to="/" id="cancel">Cancel</Link>
				</div>
				
			</form>
		)
	}
}

export default AddProject;
