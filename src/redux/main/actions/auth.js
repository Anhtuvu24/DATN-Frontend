import { AuthTypes } from '../action_types/index.js';
import AuthAPI from "../client/auth.js";

export function login(gmail, password) {
    return {
        types: [AuthTypes.LOGIN_REQUEST, AuthTypes.LOGIN_SUCCESS, AuthTypes.LOGIN_FAIL],
        callAPI: () => AuthAPI.login(gmail, password),
        payload: {},
    }
}

export function getMe() {
    return {
        types: [AuthTypes.GET_ME_REQUEST, AuthTypes.GET_ME_SUCCESS, AuthTypes.GET_ME_FAIL],
        callAPI: () => AuthAPI.getMe(),
        payload: {},
    }
}