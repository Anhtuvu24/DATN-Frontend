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
        case UserTypes.UPDATE_USER_SUCCESS:
            const { user } = action.data;
            return {
                ...state,
                [user.id]: user
            }
        case UserTypes.CREATE_USER_SUCCESS:
            const { user: user_created } = action.data;
            return {
                ...state,
                [user_created.id]: user_created
            };
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
        case UserTypes.GET_USERS_SUCCESS:
            const { users } = action.data;
            return users;
        case UserTypes.UPDATE_USER_SUCCESS:
            const { user } = action.data;
            const newUsers = state.map(item => {
                if (item.id === user.id) {
                    return user;
                }
                return item;
            })
            return newUsers;
        case UserTypes.CREATE_USER_SUCCESS:
            const { user: user_created } = action.data;
            return [...state, user_created];
        default:
            return state;
    }
}

export default combineReducers({
    users,
    all
})