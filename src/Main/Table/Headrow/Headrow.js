import React, {Component} from 'react';
import Headcell from './Headcell/Headcell'
import './Headrow.css';

class Headrow extends Component {

	columnNames = ["Id", "Project Name", "Title", "Date Created", "Date Modified", "Status"]

	renderColumns = columnNames => {
		return columnNames.map((columnName, i) => {
			const className = columnName.split(" ").join("-").toLowerCase()
			return<Headcell className={className} columnName={columnName} key={i}/>
		})
	}

	render(){
		return (
		<tr>{this.renderColumns(this.columnNames)}</tr>
		)
	}
}

export default Headrow;
