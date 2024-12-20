import { AuthTypes } from '../action_types/index.js';
import AuthAPI from "../client/auth.js";

export function login(gmail, password) {
    return {
        types: [AuthTypes.LOGIN_REQUEST, AuthTypes.LOGIN_SUCCESS, AuthTypes.LOGIN_FAIL],
        callAPI: () => AuthAPI.login(gmail, password),
        payload: {},
    }
}

export function logout() {
    return {
        types: [AuthTypes.LOGOUT_REQUEST, AuthTypes.LOGOUT_SUCCESS, AuthTypes.LOGOUT_FAIL],
        callAPI: () => AuthAPI.logout(),
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

export function uploadAvatar(id, file) {
    return {
        types: [AuthTypes.UPLOAD_AVATAR_REQUEST, AuthTypes.UPLOAD_AVATAR_SUCCESS, AuthTypes.UPLOAD_AVATAR_FAIL],
        callAPI: () => AuthAPI.uploadAvatar(id, file),
        payload: {},
    }
}

export function updateMe(id, data) {
    return {
        types: [AuthTypes.UPDATE_ME_REQUEST, AuthTypes.UPDATE_ME_SUCCESS, AuthTypes.UPDATE_ME_FAIL],
        callAPI: () => AuthAPI.updateMe(id, data),
        payload: {},
    }
}