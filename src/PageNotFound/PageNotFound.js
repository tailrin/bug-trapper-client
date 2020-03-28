import React, {Component} from 'react';
import './PageNotFound.css';

class PageNotFound extends Component {

	handleClick = () => {
		this.props.history.push('/')
	}

	render(){
		return (
			<div onClick={this.handleClick} id="center">
				<h2 className="error">404 Page not found</h2>
				<p>Click anywhere to proceed to home page.</p>
			</div>
		)
	}
}

export default PageNotFound;
