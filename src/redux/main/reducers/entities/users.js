import { combineReducers } from 'redux'
import {UserTypes} from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        case UserTypes.GET_USERS_SUCCESS:
            const { users } = action.data;
            const obj = arrayToObject(users)
            return {
                ...state,
                ...obj
            };
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case UserTypes.GET_USERS_SUCCESS:
            const { users } = action.data;
            return [...state, ...users]
        default:
            return state;
    }
}

export default combineReducers({
    users,
    all
})