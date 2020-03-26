import React, {Component} from 'react';
import './Note.css';

class Note extends Component {

	render(){
		return (
			<div className={this.props.className}>
				<div>{this.props.note.date_created}</div>
				<p>{this.props.note.content}</p>
			</div>
		)
	}
}

export default Note;
