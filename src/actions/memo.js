import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_FAILURE,
    MEMO_LIST_SUCCESS,
    MEMO_EDIT,
    MEMO_EDIT_SUCCESS,
    MEMO_EDIT_FAILIURE,
    MEMO_REMOVE,
    MEMO_REMOVE_SUCCESS,
    MEMO_REMOVE_FAILURE,
    SET_DATE,
} from './ActionTypes';
import axios from 'axios';
import moment from 'moment';

let day_arr = ["일", "월", "화", "수", "목", "금", "토"];

/* MEMO POST */
export function memoPostRequest(contents, ymd) {
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(memoPost());

        return axios.post('/api/memo/', { contents, ymd })
            .then((response) => {
                dispatch(memoPostSuccess());
            }).catch((error) => {
                dispatch(memoPostFailure(error.response.data.code));
            });
    };
}

export function memoPost() {
    return {
        type: MEMO_POST
    };
}

export function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

export function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}

/* MEMO LIST */

/*
    Parameter:
        - isInitial: whether it is for initial loading
        - listType:  OPTIONAL; loading 'old' memo or 'new' memo
        - id:        OPTIONAL; memo id (one at the bottom or one at the top)
        - username:  OPTIONAL; find memos of following user
*/
export function memoListRequest(isInitial, listType, id, username, ymd) {
    return (dispatch) => {
        console.log(`isInitial=${isInitial}, listType=${listType}, id=${id}, username=${username}, ymd=${ymd}`);

        // inform memo list API is starting
        dispatch(memoList());

        let url = '/api/memo';

        if(typeof username==="undefined") {
            // username not given, load public memo
            url = isInitial ? url : `${url}/${listType}/${id}`;
            // or url + '/' + listType + '/' +  id
        } else {
            // load memos of specific user
            /* to be implemented */
        }

        url+= `?ymd=${ymd}`;

        return axios.get(url)
            .then((response) => {
                dispatch(memoListSuccess(response.data, isInitial, listType));
            }).catch((error) => {
                dispatch(memoListFailure());
            });
    };
}

export function memoList() {
    return {
        type: MEMO_LIST
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function memoListFailure() {
    return {
        type: MEMO_LIST_FAILURE
    };
}

/* MEMO EDIT */
export function memoEditRequest(id, index, contents) {
    return (dispatch) => {
        dispatch(memoEdit());

        return axios.put('/api/memo/' + id, { contents })
            .then((response) => {
                dispatch(memoEditSuccess(index, response.data.memo));
            }).catch((error) => {
                dispatch(memoEditFailure(error.response.data.code));
            });
    };
}

export function memoEdit() {
    return {
        type: MEMO_EDIT
    };
}

export function memoEditSuccess(index, memo) {
    return {
        type: MEMO_EDIT_SUCCESS,
        index,
        memo
    };
}

export function memoEditFailure(error) {
    return {
        type: MEMO_EDIT_FAILIURE,
        error
    };
}

/* MEMO REMOVE */
export function memoRemoveRequest(id, index) {
    return (dispatch) => {
        dispatch(memoRemove());

        return axios.delete('/api/memo/' + id)
            .then((response) => {
                dispatch(memoRemoveSuccess(index));
            }).catch((error) => {
                dispatch(memoRemoveFailure(error.response.data.code));
            });
    };
}

export function memoRemove() {
    return {
        type: MEMO_REMOVE
    };
}

export function memoRemoveSuccess(index) {
    return {
        type: MEMO_REMOVE_SUCCESS,
        index
    };
}

export function memoRemoveFailure(error) {
    return {
        type: MEMO_REMOVE_FAILURE,
        error
    };
}

export function initCurrentDate() {

    return {
        type: SET_DATE,
        currentDate: moment(new Date()).format('YYYYMMDD'),
        currentDay: day_arr[moment(new Date()).day()],
    }
}

export function prevDate(date) {
    return (dispatch) => {
        let ymd = moment(date).add(-1, 'days').format('YYYYMMDD');
        let day = day_arr[moment(date).add(-1, 'days').day()];

        dispatch({
            type: SET_DATE,
            currentDate: ymd,
            currentDay: day,
        });

        return dispatch(memoListRequest(true, '', '', '', ymd));
    };
}

export function nextDate(date) {
    return (dispatch) => {
        let ymd = moment(date).add(1, 'days').format('YYYYMMDD');
        let day = day_arr[moment(date).add(1, 'days').day()];

        dispatch({
            type: SET_DATE,
            currentDate: ymd,
            currentDay: day,

        });

        return dispatch(memoListRequest(true, '', '', '', ymd));
    };
}