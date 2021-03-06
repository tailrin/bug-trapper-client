import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './FormLink.css';

class FormLink extends Component {
	static defaultProps = {
		name: ""
	}

	render(){
		return (
		<span><Link to={`/${this.props.name.split(' ').join('')}`} className={this.props.className}>{this.props.name}</Link></span>
		)
	}
}

export default FormLink;
