import React, { Component } from 'react';
import './navBar.scss';

class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <div className="logoContainer">
                    <span className="logo">SOKO</span>
                </div>
            </div>
        );
    }
}

export default NavBar;
