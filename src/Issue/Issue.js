import React, {Component} from 'react';
import Note from '../Note/Note';
import config from '../config';
import './Issue.css';

class Issue extends Component {
	static defaultProps ={
		getById: () => {},
		match: {
			params: {
				issue_id: ""
			}
		},
		history: {
			push: () => {}
		}
	}

	state = {
		date_created: "",
		date_modified: "",
		description: "",
		issueNotes: [],
		status: "",
		content: "",
		title: ""
	}

	componentDidMount = () => {
		config.checkForAuth(this.props.history)
		if(!window.sessionStorage.jwt){return}
		const options = config.getOptions('get')
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			const {date_created, date_modified, description, status, title} = res.issue
			this.setState({
				date_created: date_created, 
				date_modified: date_modified, 
				description: description, 
				status: status, 
				issueNotes: res.notes.reverse(),
				title: title
			})
		})

	}

	handleChangeContent = event => {
		this.setState({content: event.target.value})
	}

	handleStatusChange = event => {
		const data = {
			field: 'status',
			field_value: event.target.value
		}
		const options = JSON.parse(JSON.stringify(config.getOptions('put')))
		options.body = JSON.stringify(data)
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			this.setState({status: res.status})
			this.handleDateModified()
			this.props.reloadUser()
		}).catch(err => {
			event.target.value = this.state.status
		})
	}

	handleDateModified = () => {
		const data = {
			field: 'date_modified',
			field_value: new Date().toISOString()
		}
		const options = JSON.parse(JSON.stringify(config.getOptions('put')))
		options.body = JSON.stringify(data)
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			this.setState({status: res.status})
			this.componentDidMount()
		}).catch(err => {
			console.log(err)
		})
	}

	renderNotes(){
		return this.state.issueNotes.map((note, i) => {
			return <Note className="note" note={note} key={i}/>
		})
	}

	handleSubmit = () => {
		const options = JSON.parse(JSON.stringify(config.getOptions('post')))
		options.body = JSON.stringify({content: this.state.content})
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			console.log(res)
		})
	}

	handleTitleChange = event => {
		this.setState({title: event.target.value})
	}

	goHome =()=>{
		this.props.history.push('/')
	}

	validateNote = () => {
		return this.state.content.length < 50
	}

	render(){
		return (
			<>
				{this.props.children}
				<main>
					<button onClick={this.goHome} id="home-button"><img src="/imgs/home.png" id="home-button-img" alt="home button icon"/></button>
					<form onSubmit={this.handleSubmit}>
						<div id="top-line">
							<span>Date Created: {this.state.date_created.split('T').join(' ').split('.')[0]}</span>
							<label htmlFor="status" id="status-label">Status:  
								<select onChange={this.handleStatusChange} id="status">
									<option value="Active">Active</option>
									<option value="Closed">Closed</option>
								</select>
							</label>
						</div>
						<span>Date Modified: {this.state.date_modified.split('T').join(' ').split('.')[0]}</span><br/>
						<p>Title: {this.state.title}<br/>
							Description:<br/>
							{this.state.description}
						</p>
						<label htmlFor="add-note">Notes:</label><br/>
						<textarea id="add-note" onChange={this.handleChangeContent} required/><br/>
						{this.validateNote() && <p className="error">Note must contain at least 50 character to add note</p>}
						<button>Add Note</button>
						
					</form>
					{this.renderNotes()}
				</main>
			</>
		)
	}
}

export default Issue;
