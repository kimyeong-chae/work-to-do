import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import {App, Home, Login, Register, Accounts} from 'containers';
import { createBrowserHistory } from 'history';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


// HTML5 History API 지원여부 파악
// const isBrowserHistory = history.pushState;
const Router = BrowserRouter;

const store = createStore(reducers, applyMiddleware(thunk,logger));

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <Router >
            <div>
                <Route path="/" component={App}/>
                <Route exact={true} path="/home" component={Home} />
                <Route path="/account" component={Accounts} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </Router>
    </Provider>
    , rootElement
);
