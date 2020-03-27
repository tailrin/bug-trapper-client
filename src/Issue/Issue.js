import React, {Component} from 'react';
import Note from '../Note/Note';
import config from '../config';
import './Issue.css';

class Issue extends Component {
	static defaultProps ={
		getById: () => {}
	}

	state = {
		date_created: "",
		date_modified: "",
		description: "",
		issueNotes: [],
		status: "",
		content: ""
	}

	componentDidMount = () => {
		const options = config.getOptions('get')
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			const {date_created, date_modified, description, status} = res.issue
			this.setState({
				date_created: date_created, 
				date_modified: date_modified, 
				description: description, 
				status: status, 
				issueNotes: res.notes.reverse()
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
		const options = JSON.parse(JSON.stringify(config.getOptions('post')))
		options.body = JSON.stringify(data)
		fetch(`${config.API}/issues/${this.props.match.params.issue_id}`, options).then(res => res.json()).then(res => {
			this.setState({status: res.status})
		}).catch(err => {
			console.log(err)
			window.alert('Something went wrong unable to change status, please try again later')
			event.target.value = this.state.status
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

	render(){
		return (
			<main>
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
					<p>Description:<br/>
						{this.state.description}
					</p>
					<label htmlFor="add-note">Notes:</label><br/>
					<textarea rows="5" cols="60" id="add-note" onChange={this.handleChangeContent}/>
					<button>Update</button>
					
				</form>
				{this.renderNotes()}
			</main>
		)
	}
}

export default Issue;