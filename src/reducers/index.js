import authentication from './authentication';
import memo from "./memo";
import account from "./account";
import {combineReducers} from 'redux';

export default combineReducers({
    authentication,
    memo,
    account
});