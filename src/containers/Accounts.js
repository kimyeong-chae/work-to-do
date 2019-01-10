import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {AccountList} from '../components'
import {connect} from 'react-redux';
import {
    accountListRequest,
} from "../actions/account";


class Accounts extends Component {

    componentDidMount() {
        this.props.accountListRequest().then(
            () => {
                console.log(this.props.accountData);
            }
        );
    }

    render() {
        return (
            <div>
                { this.props.isLoggedIn ? <AccountList data={this.props.accountData}/> : undefined }
            </div>
        );
    }
}

Accounts.propTypes = {};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        accountData: state.account.list.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        accountListRequest: () => {
            return dispatch(accountListRequest());
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
