import React, {Component} from 'react';
import FormLink from './FormLink/FormLink';
import './Nav.css';

class Nav extends Component {

    renderNavLinks(){
        if(!!window.localStorage.jwt){
            
        }
    }
    
    render(){
        return (
            <nav><FormLink name="Login"/> / <FormLink name="Sign Up"/> </nav>
        )
    }
}

export default Nav;