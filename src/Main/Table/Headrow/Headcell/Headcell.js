import React, {Component} from 'react';
import './Headcell.css';

class Headcell extends Component {

	render(){
		return (
		<th className={this.props.className}>{this.props.columnName}</th>
		)
	}
}

export default Headcell;
