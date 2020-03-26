import React, {Component} from 'react';
import FormLink from './FormLink/FormLink';
import {Link} from 'react-router-dom'
import './Nav.css';

class Nav extends Component {
    

    renderNavLinks(){
        if(this.props.loggedIn){
            return <nav><Link to="/" onClick={this.props.logout}>Logout</Link></nav>
        }
        return <nav><FormLink name="Login"/> / <FormLink name="Sign Up"/> </nav>
    }
    
    render(){
        return this.renderNavLinks()
    }
}

export default Nav;