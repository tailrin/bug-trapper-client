import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Cell.css';

class Cell extends Component {
	static defaultProps = {
		className: "",
		cellData: "",
		issueId: ""
	}
	
	generateCell = () => {
		if(this.props.className === "title cell"){
			return <td className={this.props.className}><Link to={`/Issues/${this.props.issueId}`}>test data</Link></td>
		}
		return <td className={this.props.className}>{this.props.cellData}</td>
	}

	render(){
		return this.generateCell()
	}
}

export default Cell;
