import React, {Component} from 'react';
import Cell from './Cell/Cell';
import './Row.css';

class Row extends Component {

	static defaultProps = {
		issue: {
			id: "",
			project_id: "",
			description: "",
			date_created: "",
			date_modified: "",
			status: ""
		},
		getProjectNameById: () => {return ""}
	}

	generateCells =() => {
		const issue = this.props.issue
		return (
			<tr>
				<Cell className="id" cellData={issue.id}/>
				<Cell className="Project Name" cellData={this.props.getProjectNameById(issue.project_id)}/>
				<Cell className="description" cellData={issue.description} issueId={issue.id}/>
				<Cell className="date-created" cellData={issue.date_created.split('T').join(' ').split('.')[0]}/>
				<Cell className="date-modified" cellData={issue.date_modified.split('T').join(' ').split('.')[0]}/>
				<Cell className="status" cellData={issue.status}/>
				
			</tr>
		)
	}

	render(){
		return (
			this.generateCells()
		)
	}
}

export default Row;
