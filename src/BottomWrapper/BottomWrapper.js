import React, {Component} from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import './BottomWrapper.css';

class BottomWrapper extends Component {

	render(){
		return (
			<div className="bottom-wrapper">
				<Sidebar projects={this.props.projects}/>
				<Main issues={this.props.issues}/>
			</div>
		)
	}
}

export default BottomWrapper;
