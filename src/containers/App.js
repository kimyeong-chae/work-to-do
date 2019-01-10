import React, {Component}from 'react';
import {Header} from 'components';
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from 'actions/authentication';
import { initCurrentDate, prevDate, nextDate } from '../actions/memo';

class App extends Component {

    constructor(props) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this);
        this.handlePrevDate = this.handlePrevDate.bind(this);
        this.handleNextDate = this.handleNextDate.bind(this);
    }

    componentWillMount() {
        this.props.initCurrentDate();
    }

    componentDidMount() {
        // get cookie by name
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // get loginData from cookie
        let loginData = getCookie('key');

        // if loginData is undefined, do nothing
        if(typeof loginData === "undefined") return;

        // decode base64 & parse json
        loginData = JSON.parse(atob(loginData));

        // if not logged in, do nothing
        if(!loginData.isLoggedIn) {
            // location.href = '/login';
            return;
        };

        // page refreshed & has a session in cookie,
        // check whether this cookie is valid or not
        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status);
                // if session is not valid
                if(!this.props.status.valid) {
                    // logout the session
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie='key=' + btoa(JSON.stringify(loginData));

                    // and notify
                    let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                    M.toast({html: $toastContent});

                }
            }
        );



    }

    handleLogout ()  {
        this.props.logoutRequest().then(
            () => {
                M.toast({html: 'Good Bye!'});

                // EMPTIES THE SESSION
                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                location.href='/login';
            }
        );
    }

    handlePrevDate() {
        this.props.prevDate(this.props.currentDate);
    }

    handleNextDate() {
        this.props.nextDate(this.props.currentDate);
    }

    render(){

        /* Check whether current route is login or register using regex */
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                {
                    isAuth ?
                        undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                            onLogout={this.handleLogout}
                                            handlePrevDate={this.handlePrevDate}
                                            handleNextDate={this.handleNextDate}
                                            date={this.props.currentDate}

                                    />
                }

                { this.props.children }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status,
        currentDate: state.memo.date.currentDate
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        },
        initCurrentDate: () => {
            return dispatch(initCurrentDate());
        },
        prevDate: (date) => {
            return dispatch(prevDate(date));
        },
        nextDate: (date) => {
            return dispatch(nextDate(date));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
