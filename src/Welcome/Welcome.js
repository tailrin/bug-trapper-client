import React, {Component} from 'react';
import config from '../config';
import './Welcome.css';

class Welcome extends Component {

	componentDidMount = () => {
		fetch(config.API, config.getOptions('get')).then(res => res.json()).then(res => console.log(res))
	}

	render(){
		// if(document.getElementById('base').offsetHeight < window.innerHeight ){
			
		// 	document.getElementById('base').style.height = '100%'
		//   }
		return (
			<>
			<div id="welcome-screen">Welcome to Bug Trapper<br/>
				<p id="greeting">This is a basic issue tracker. You must be logged in to use this app. Don't worry I won't collect any of your data. If you want to take a look first before signing up I understand and so have provided a dummy account. The credentials for that dummy account are on the login page.</p>
			</div>
			
			</>
		)
	}
}

export default Welcome;
