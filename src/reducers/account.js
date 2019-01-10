import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';
import {ACCOUNT_LIST, ACCOUNT_LIST_FAILURE, ACCOUNT_LIST_SUCCESS} from "../actions/ActionTypes";


const initialState = {
    list: {
        status: 'INIT',
        data: [],
    },
};

export default function account(state = initialState, action) {
    switch (action.type) {
        case ACCOUNT_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WAITING' },
                }
            });
        case ACCOUNT_LIST_SUCCESS:
            return update(state, {
                list: {
                    status: {$set: 'SUCCESS'},
                    data: { $set: action.data},
                }
            });
        case ACCOUNT_LIST_FAILURE:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            })
        default:
            return state;
    }
}