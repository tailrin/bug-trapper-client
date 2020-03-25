import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import config from '../config'
import {Link} from 'react-router-dom'
import './SignUp.css';

class SignUp extends Component {

	state ={
		userName: "",
		fullName: "",
		password: "",
		confirmPassword: "",
	}

	checkErr = () => {
		return !!this.validateConfirmPassword(this.state.confirmPassword) || !!this.validatePassword(this.state.password) || !!this.validateUserName(this.state.userName) || !!this.validateFullName(this.state.fullName)
	}

	handleSubmit = event => {
		event.preventDefault();
		if(!this.checkErr()){
			const {userName, fullName, password} = this.state
			const data = {user_name : userName, full_name: fullName, password: password}
			const options = {
				method: 'POST',
            headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			};
			fetch(`${config.API}/api/users`, options).then(res => res.json()).then(() => {
				this.props.history.push('/login')
			})
		}
	}

	handleUserName = event => {
		this.setState({userName: event.target.value.trim()})
	}

	handleFullName = event => {
		this.setState({fullName: event.target.value.trim()})
	}

	handlePassword = event => {
		this.setState({password: event.target.value.trim()})
	}

	handleConfirmPassword = event => {
		this.setState({confirmPassword: event.target.value.trim()})
	}

	validatePassword = password => {
		const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
		if (password.length < 8) {
			return <p className="error">Password must be longer than 8 characters</p>
		}
		if (password.length > 72) {
			return <p className="error" >Password be less than 72 characters</p>
		}
		if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
			return <p className="error" >Password must contain one upper case, lower case, number and special character</p>
		}
	}

	validateUserName = (userName) =>{
		const REGEX_UPPER_LOWER_NUMBER_SPECIAL = new RegExp('/(?=.*[0-9])(?=.*[!@#\\$%\\^&])[\\S]+/')
		if(userName.length < 4){
			return <p className="error" >User name must be longer than 3 characters</p>
		}
		if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(userName)) {
			return <p className="error" >User name can only contain letters</p>
		}
	}

	validateFullName = (fullName) =>{
		const REGEX_UPPER_LOWER_NUMBER_SPECIAL = new RegExp('/(?=.*[0-9])(?=.*[!@#\\$%\\^&])[\\S]+/')
		if(fullName.length < 4){
			return (<p className="error" >Full name must be longer than 3 characters</p>)
		}
		if (REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(fullName)) {
			return <p className="error" >Full name can only contain letters</p>
		}
	}

	validateConfirmPassword = (confirmPassword) => {
		if(confirmPassword !== this.state.password){
			return (<p className="error">Passwords do not match</p>)
		}
	}	

	render(){
		return (
			<form id="sign-up" onSubmit={this.handleSubmit} >
				<div className="user-name-wrapper">
					<label htmlFor="user-name" className="sign-up-label">User Name: </label>
					<input type="text"  onChange={this.handleUserName} id="user-name" required className="sign-up-inputs"/>
					{this.validateUserName(this.state.userName)}
				</div>
				<div className="full-name-wrapper">
					<label htmlFor="full-name" className="sign-up-label">Full Name: </label>
					<input type="text"  onChange={this.handleFullName} id="full-name" required className="sign-up-inputs"/>
					{this.validateFullName(this.state.fullName)}
				</div>
				<div className="password-wrapper">
					<label htmlFor="password" className="sign-up-labels">Password: </label>					
					<input type="password" id="password" onChange={this.handlePassword} className="sign-up-inputs" required/>
					{this.validatePassword(this.state.password)}
				</div>
				<div className="password-wrapper">
					<label htmlFor="confirm-password" className="sign-up-labels"> Confirm Password: </label>					
					<input type="password" id="confirm-password" onChange={this.handleConfirmPassword} className="sign-up-inputs" required/>
					{this.validateConfirmPassword(this.state.confirmPassword)}
				</div>
				<div className="button-wrapper">
					<button type="submit" id="sign-up-button" disabled={this.checkErr()}>Sign Up</button>
					<Link to="/" id="cancel">Cancel</Link>
				</div>
			</form>
		)
	}
}

export default SignUp;
