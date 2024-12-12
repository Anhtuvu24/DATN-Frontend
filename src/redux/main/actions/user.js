import { UserTypes } from '../action_types/index.js';
import UserAPI from "../client/user.js";

export function getUsers(page, limit) {
    return {
        types: [UserTypes.GET_USERS_REQUEST, UserTypes.GET_USERS_SUCCESS, UserTypes.GET_USERS_FAIL],
        callAPI: () => UserAPI.getUsers(page, limit),
        payload: {},
    }
}