import React, {Component} from 'react';
import './ThankYou.css';

class ThankYou extends Component {

	linkToLogin = () => {
		this.props.history.push('/login')
	}

	render(){
		return (
			<p className="whole" onClick={this.linkToLogin}>Thank you for choosing Bug Trapper.<br/>Clich anywhere to proceed</p>
		)
	}
}

export default ThankYou;
