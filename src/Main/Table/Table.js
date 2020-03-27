import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Table.css';
import Headrow from './Headrow/Headrow';
import	Row from './Row/Row';

class Table extends Component {

	generateRows = issues => {
		return issues.map((issue, i) => <Row issue={issue} key={i} getProjectNameById={this.props.getProjectNameById}/>)
	}

	render(){
		return (
			<>
				<table>
					<thead>
						<Headrow/>
					</thead>
					<tbody>
						{this.generateRows(this.props.issues)}
					</tbody>
				</table>
				<Link to="/AddIssue">Add Issue</Link>
			</>
		)
	}
}

export default Table;