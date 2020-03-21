import React, {Component} from 'react';
import Nav from './Nav/Nav';
import "./Header.css";
import { Link } from 'react-router-dom';

class Header extends Component {

    render(){
        return (
            <header>
                <div className="logo-wrapper">
                    <h1><Link to="/" id="logo">Bug Trapper</Link></h1>
                </div>
                <Nav/>
            </header>
        )
    }
}

export default Header;