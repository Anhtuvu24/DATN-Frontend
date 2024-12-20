import { combineReducers } from 'redux'
import {ActionTypes, AuthTypes} from "../../action_types/index.js";
import { setAuthorization } from "../../client/axiosConfig.js";
import AuthFunction from '../../../../utils/Auth';

function user(state = {}, action) {
    switch (action.type) {
        case AuthTypes.LOGIN_SUCCESS:
            const { user, accessToken, refreshToken } = action.data;
            setAuthorization(accessToken, refreshToken);
            AuthFunction.login({ accessToken, refreshToken });
            return {
                ...state,
                ...user
            };
        case AuthTypes.GET_ME_SUCCESS:
            const { user: _user, tasks, projects, newAccessToken,  newRefreshToken} = action.data;
            if (newRefreshToken && newRefreshToken) {
                setAuthorization(newAccessToken, newRefreshToken);
                AuthFunction.login({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            }
            return {
                ...state,
                ..._user,
                tasks,
                projects
            }
        case AuthTypes.UPLOAD_AVATAR_SUCCESS:
            const { user: userUpload } = action.data;
            return {
                ...state,
                ...userUpload
            }
        case AuthTypes.UPDATE_ME_SUCCESS:
            const { user: userUpdate } = action.data;
            return {
                ...state,
                ...userUpdate
            }
        case AuthTypes.LOGOUT_SUCCESS:
            AuthFunction.logout();
            return state;
        default:
            return state;
    }
}

function noties(state = {}, action) {
    switch (action.type) {
        case ActionTypes.GET_ACTIONS_BY_USER_SUCCESS:
            return action.data
        case ActionTypes.UPDATE_ACTION_SUCCESS:
            const { actionId, is_read } = action;
            const newArr = state?.data?.map(item => {
                if (item.id === actionId) {
                    return {
                        ...item,
                        is_read
                    }
                }
                return item;
            })
            const newUnread = is_read ? state?.pagination?.unreadCount -1 : state?.pagination?.unreadCount + 1;
            return {
                ...state,
                data: newArr,
                pagination: {
                    ...state?.pagination,
                    unreadCount: newUnread
                }
            };
        default:
            return state;
    }
}

export default combineReducers({
    user,
    noties
})