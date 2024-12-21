import { combineReducers } from 'redux'
import {AuthTypes, UserTypes} from "../../action_types/index.js";
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
        case AuthTypes.UPLOAD_AVATAR_SUCCESS:
            const { user: userUpload } = action.data;
            return {
                ...state,
                [userUpload.id]: userUpload
            }
        case AuthTypes.UPDATE_ME_SUCCESS:
            const { user: userUpdate } = action.data;
            return {
                ...state,
                [userUpdate.id]: userUpdate
            }
        case UserTypes.DELETE_USER_SUCCESS:
            const newAllUser = state;
            delete newAllUser[action.id];
            return newAllUser;
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
        case AuthTypes.UPLOAD_AVATAR_SUCCESS:
            const { user: userUpload } = action.data;
            const newUsers1 = state.map(item => {
                if (item.id === userUpload.id) {
                    return userUpload;
                }
                return item;
            })
            return newUsers1;
        case AuthTypes.UPDATE_ME_SUCCESS:
            const { user: userUpdate } = action.data;
            const newUsers2 = state.map(item => {
                if (item.id === userUpdate.id) {
                    return userUpdate;
                }
                return item;
            })
            return newUsers2;
        case UserTypes.DELETE_USER_SUCCESS:
            const newUsers3 = state.filter(item => item.id !== action.id);
            return newUsers3;
        default:
            return state;
    }
}

export default combineReducers({
    users,
    all
})