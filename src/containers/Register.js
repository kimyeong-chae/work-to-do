import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerRequest } from 'actions/authentication';

import {Authentication} from '../components';

class Register extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw, dept) {
        return this.props.registerRequest(id, pw, dept).then(
            () => {
                if(this.props.status === "SUCCESS") {
                    M.toast({html: 'Success! Please log in.'});
                    return true;
                } else {
                    /*
                        ERROR CODES:
                            1: BAD USERNAME
                            2: BAD PASSWORD
                            3: USERNAME EXISTS
                    */
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    M.toast({html: $toastContent});
                    return false;
                }
            }
        );
    }

    render() {
        return (
            <div>
                <Authentication mode={false} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw, dept) => {
            return dispatch(registerRequest(id, pw,dept));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);