import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AccountList extends Component {
    render() {
        const mapToComponents = data => {
            return data.map((account, i) => {
                return (
                    <tr>
                        <td>{i+1}</td>
                        <td>{account.username}</td>
                        <td>{account.department}</td>
                        <td>{account.created}</td>
                    </tr>
                );
            });
        };

        return (
            <div className="container">
                <div className="card">
                    <div className="card-content">
                        <table className="highlight centered">
                            <thead>
                            <tr>
                                <th>NO</th>
                                <th>ID</th>
                                <th>DEPARTMENT</th>
                                <th>JOIN DATE</th>
                            </tr>
                            </thead>
                            <tbody>
                                {mapToComponents(this.props.data)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

AccountList.propTypes = {
    data: PropTypes.array,
};

export default AccountList;
