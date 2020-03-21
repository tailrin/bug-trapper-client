import React, {Component} from 'react';
import './Table.css';
import Headrow from './Headrow/Headrow';
import	Row from './Row/Row';

class Table extends Component {

	generateRows = issues => {
		return issues.map((issue, i) => <Row issue={issue} key={i}/>)
	}

	render(){
		return (
			<table>
				<thead>
					<Headrow/>
				</thead>
				<tbody>
					{this.generateRows(this.props.issues)}
				</tbody>
			</table>
		)
	}
}

export default Table;
