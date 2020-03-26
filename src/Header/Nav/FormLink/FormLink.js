import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './FormLink.css';

class FormLink extends Component {

	render(){
		return (
		<span><Link to={`/${this.props.name.split(' ').join('')}`}>{this.props.name}</Link></span>
		)
	}
}

export default FormLink;
