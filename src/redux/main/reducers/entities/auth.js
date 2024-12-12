import { combineReducers } from 'redux'
import { AuthTypes } from "../../action_types/index.js";
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
            const { user: _user, newAccessToken,  newRefreshToken} = action.data;
            if (newRefreshToken && newRefreshToken) {
                setAuthorization(newAccessToken, newRefreshToken);
                AuthFunction.login({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            }
            return {
                ...state,
                ..._user,
            }
        default:
            return state;
    }
}

export default combineReducers({
    user
})