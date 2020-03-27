import React, {Component} from 'react';
import './Welcome.css';

class Welcome extends Component {

	render(){
		return (
			<>
			<div id="welcome-screen">Welcome to Bug Trapper<br/>
				<p>This is a basic issue tracker. You must be logged in to use this app. Don't worry I won't collect any of your data. If you want to take a look first before signing up I understand and so have provided a dummy account. The credentials for that dummy account are on the login page.</p>
			</div>
			
			</>
		)
	}
}

export default Welcome;
