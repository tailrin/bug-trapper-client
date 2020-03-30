import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import CircleLoader from 'react-spinners/CircleLoader'
import config from '../config'
import './Login.css';

class Login extends Component {
	state = {
		user_name: "",
		password: "",
		err: "",
		loading: false
	}

	handleInput = event => {
		if(event.target.id === "user-name"){
			this.setState({user_name: event.target.value.toLowerCase()})
		} else if(event.target.id === "password"){
			this.setState({password: event.target.value})
		} 
	}

	handleSubmit = event => {
		event.preventDefault();
		const data = this.state;
		fetch(`${config.API}/api/auth/login`, {
			method: 'POST',
            headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(res => res.json()).then(res => {
			if(!!res.authToken){
				window.sessionStorage.setItem('jwt', res.authToken)
				let payload = res.authToken.split('.')[1];
				payload = Buffer.from(payload, 'base64').toString('ascii');
				payload = JSON.parse(payload)
				this.props.handleLogin(payload.user_id);
				this.props.history.push('/')
			}else{
				this.setState({err: res.error})
			}
		})
		this.setState({loading: true})

	}

	render(){
		let login;
		if(this.state.loading){login = "Loading"} else {login = "Login"}
		return (

			<form id="login" onSubmit={this.handleSubmit} > 
				<p className="error">{this.state.err}</p><br/>
				<p>Credentials for dummy account<br/>
					User Name: user<br/>
					Password: P@ssword1
				</p>
				<div className="user-name-wrapper">
					<label htmlFor="user-name" className="login-label">User Name: </label>
					<input type="text"  onChange={this.handleInput} id="user-name" required className="login-inputs"/>
				</div>
				<div className="password-wrapper">
					<label htmlFor="password" className="login-labels">Password: </label>					
					<input type="password" id="password" onChange={this.handleInput} className="login-inputs" required/>
				</div>
				<div className="button-wrapper">
					<button type="submit" id="login-button" disabled={this.state.loading}>
						{this.state.loading ? <CircleLoader loading={this.state.loading}/>: login}
					</button>
					<Link to="/" id="cancel">Cancel</Link>
				</div>
			</form>

		)
	}
}

export default Login;
