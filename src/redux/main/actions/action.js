import { ActionTypes } from '../action_types/index.js';
import ActionAPI from "../client/action.js";

export function getActionsByUser(userId, page, limit) {
    return {
        types: [ActionTypes.GET_ACTIONS_BY_USER_REQUEST, ActionTypes.GET_ACTIONS_BY_USER_SUCCESS, ActionTypes.GET_ACTIONS_BY_USER_FAIL],
        callAPI: () => ActionAPI.getActionsByUser(userId, page, limit),
        payload: {},
    }
}

export function getActionsByTask(taskId, page, limit) {
    return {
        types: [ActionTypes.GET_ACTIONS_BY_TASK_REQUEST, ActionTypes.GET_ACTIONS_BY_TASK_SUCCESS, ActionTypes.GET_ACTIONS_BY_TASK_FAIL],
        callAPI: () => ActionAPI.getActionsByTask(taskId, page, limit),
        payload: {},
    }
}

export function updateAction(actionId, data) {
    return {
        types: [ActionTypes.UPDATE_ACTION_REQUEST, ActionTypes.UPDATE_ACTION_SUCCESS, ActionTypes.UPDATE_ACTION_FAIL],
        callAPI: () => ActionAPI.updateAction(actionId, data),
        payload: {actionId, is_read: data.is_read},
    }
}