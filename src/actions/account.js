import axios from 'axios';

import {
    ACCOUNT_LIST,
    ACCOUNT_LIST_FAILURE,
    ACCOUNT_LIST_SUCCESS,
} from './ActionTypes';

/* MEMO LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/
export function accountListRequest() {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(accountList());

        let url = '/api/account/';

        return axios.get(url)
            .then((response) => {
                dispatch(accountListSuccess(response.data));
            }).catch((error) => {
                dispatch(accountListFailure());
            });
    };
}

export function accountList() {
    return {
        type: ACCOUNT_LIST
    };
}

export function accountListSuccess(data) {
    return {
        type: ACCOUNT_LIST_SUCCESS,
        data,
    };
}

export function accountListFailure() {
    return {
        type: ACCOUNT_LIST_FAILURE
    };
}