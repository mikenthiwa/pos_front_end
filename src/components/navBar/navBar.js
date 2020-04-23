import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './navBar.scss';

export class NavigationBar extends Component {

    openLinkedIn = () => {
        window.open('https://www.linkedin.com/in/michaelnthiwamutua/', '_blank' )
    };
    render() {
        return (
            <div className="navBar">
                <div className="logoContainer">
                    <span className="logo">SOKO</span>
                    <span className="linkedInIcon" onClick={this.openLinkedIn}>
                        <FontAwesomeIcon  icon={faLinkedin} size={"lg"} color="white" />
                    </span>
                </div>
            </div>
        );
    }
}

