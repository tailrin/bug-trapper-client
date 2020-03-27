import React, {Component} from 'react';
import Nav from './Nav/Nav';
import "./Header.css";
import { Link } from 'react-router-dom';

class Header extends Component {

    render(){
        return (
            <header>
                <div className="logo-wrapper">
                    <h1><Link to="/" id="logo" onClick={this.props.reloadUser}>Bug Trapper</Link></h1>
                </div>
                <Nav loggedIn={this.props.loggedIn} logout={this.props.logout}/>
            </header>
        )
    }
}

export default Header;