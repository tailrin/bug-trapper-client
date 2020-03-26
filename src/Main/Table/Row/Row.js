import React, {Component} from 'react';
import Cell from './Cell/Cell';
import './Row.css';

class Row extends Component {

	generateCells =() => {
		const issue = this.props.issue
		return (
			<tr>
				<Cell className="id" cellData={issue.id}/>
				<Cell className="description" cellData={issue.description} issueId={issue.id}/>
				<Cell className="date-reported" cellData={issue.date_created}/>
				<Cell className="date-last-worked" cellData={issue.date_modified}/>
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
