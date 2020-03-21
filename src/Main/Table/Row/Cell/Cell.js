import React, {Component} from 'react';
import './Cell.css';

class Cell extends Component {

	render(){
		return (
		<td className={this.props.className}>{this.props.cellData}</td>
		)
	}
}

export default Cell;
