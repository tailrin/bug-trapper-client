import React, {Component} from 'react';
import Nav from './Nav/Nav';
import "./Header.css";

class Header extends Component {


    render(){
        return (
            <header>
                <div className="logo-wrapper">
                    <h1>Bug Trapper</h1>
                </div>
                <Nav/>
            </header>
        )
    }
}

export default Header;