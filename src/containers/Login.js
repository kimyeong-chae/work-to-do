import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Authentication} from 'components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw) {
        return this.props.loginRequest(id, pw).then(
            () => {
                if (this.props.status === 'SUCCESS') {
                    // create session data
                    let loginData = {
                        isLoggedIn: true,
                        username: id
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    M.toast({html : 'Welcome, ' + id + '!'},2000);
                    // history.push('/');
                    return true;
                }  else {
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    M.toast({html: $toastContent}, 2000);
                    return false;
                }
            }
        )
    }


    render() {
        return (
            <div>
                <Authentication mode={true} onLogin={this.handleLogin}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.login.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id,pw));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
