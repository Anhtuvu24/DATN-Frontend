import { UserTypes } from '../action_types/index.js';
import UserAPI from "../client/user.js";

export function getUsers(page, limit) {
    return {
        types: [UserTypes.GET_USERS_REQUEST, UserTypes.GET_USERS_SUCCESS, UserTypes.GET_USERS_FAIL],
        callAPI: () => UserAPI.getUsers(page, limit),
        payload: {},
    }
}

export function changePassword(userId, currentPassword, newPassword) {
    return {
        types: [UserTypes.CHANGE_PASSWORD_REQUEST, UserTypes.CHANGE_PASSWORD_SUCCESS, UserTypes.CHANGE_PASSWORD_FAIL],
        callAPI: () => UserAPI.changePassword(userId, currentPassword, newPassword),
        payload: {},
    }
}

export function forgotPassword(gmail) {
    return {
        types: [UserTypes.FORGOT_PASSWORD_REQUEST, UserTypes.FORGOT_PASSWORD_SUCCESS, UserTypes.FORGOT_PASSWORD_FAIL],
        callAPI: () => UserAPI.forgotPassword(gmail),
        payload: {},
    }
}

export function updateUser(id, data) {
    return {
        types: [UserTypes.UPDATE_USER_REQUEST, UserTypes.UPDATE_USER_SUCCESS, UserTypes.UPDATE_USER_FAIL],
        callAPI: () => UserAPI.updateUser(id, data),
        payload: {}
    }
}

export function createUser(data) {
    return {
        types: [UserTypes.CREATE_USER_REQUEST, UserTypes.CREATE_USER_SUCCESS, UserTypes.CREATE_USER_FAIL],
        callAPI: () => UserAPI.createUser(data),
        payload: {}
    }
}

export function deleteUser(id) {
    return {
        types: [UserTypes.DELETE_USER_REQUEST, UserTypes.DELETE_USER_SUCCESS, UserTypes.DELETE_USER_FAIL],
        callAPI: () => UserAPI.delelteUser(id),
        payload: {id}
    }
}