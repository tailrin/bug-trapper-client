import React, {Component} from 'react';
import FormLink from './FormLink/FormLink';
import './Nav.css';

class Nav extends Component {

    

    renderNavLinks(){
        if(this.props.loggedIn){
            return <nav><span onClick={this.props.logout}className="link-sim" >Logout</span></nav>
        }
        return <nav><FormLink name="Login"/> / <FormLink name="Sign Up"/> </nav>
    }
    
    render(){
        return this.renderNavLinks()
    }
}

export default Nav;