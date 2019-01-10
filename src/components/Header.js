import React, {Component} from 'react';
import PropTypes from 'prop-type';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

class Header extends Component {

    render() {
        const loginButton = (
            <li>
                <Link to="/login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <div>
                <li>
                    <Link to="/account">
                        <i className="material-icons">person</i>
                    </Link>
                </li>
                <li>
                    <a onClick={this.props.onLogout}>
                        <i className="material-icons">lock_open</i>
                    </a>
                </li>
            </div>
        );

        const fontSizeLarge = {
            fontSize: 'xx-large'
        }

        return (

            <nav>
                <div className="nav-wrapper blue darken-1">

                    <Link to="/home" className="brand-logo">Work TO DO</Link>

                    <div style={{ marginLeft:'42%'}}>
                        <ul>
                            <li>
                                <a style={fontSizeLarge} onClick={this.props.handlePrevDate}>
                                    <i className="material-icons">navigate_before</i>
                                </a>
                            </li>
                            <li>
                                <a style={fontSizeLarge}><Moment format="YYYY. MM. DD">{this.props.date}</Moment></a>
                            </li>
                            <li>
                                <a style={fontSizeLarge} onClick={this.props.handleNextDate}>
                                    <i className="material-icons">navigate_next</i>
                                </a>
                            </li>
                        </ul>
                    </div>



                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

//
// Header.propTypes = {
//     isLoggedIn: PropTypes.bool,
//     onLogout: PropTypes.func
// };
//
// Header.defaultProps = {
//     isLoggedIn : false,
//     onLogout: () => {console.error("logout function not defined");}
// };



export default Header;