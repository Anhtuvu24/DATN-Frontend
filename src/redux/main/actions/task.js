import { TaskTypes } from '../action_types/index.js';
import TaskAPI from "../client/task.js";

export function getTasks(sprintId) {
    return {
        types: [TaskTypes.GET_TASKS_REQUEST, TaskTypes.GET_TASKS_SUCCESS, TaskTypes.GET_TASKS_FAIL],
        callAPI: () => TaskAPI.getTasks(sprintId),
        payload: {},
    }
}

export function searchTasks(params) {
    return {
        types: [TaskTypes.SEARCH_TASKS_REQUEST, TaskTypes.SEARCH_TASKS_SUCCESS, TaskTypes.SEARCH_TASKS_FAIL],
        callAPI: () => TaskAPI.searchTasks(params),
        payload: {},
    }
}

export function getTask(id) {
    return {
        types: [TaskTypes.GET_TASK_REQUEST, TaskTypes.GET_TASK_SUCCESS, TaskTypes.GET_TASK_FAIL],
        callAPI: () => TaskAPI.getTask(id),
        payload: {},
    }
}

export function createTask(data) {
    return {
        types: [TaskTypes.CREATE_TASK_REQUEST, TaskTypes.CREATE_TASK_SUCCESS, TaskTypes.CREATE_TASK_FAIL],
        callAPI: () => TaskAPI.createTask(data),
        payload: {},
    }
}

export function updateTask(id, data) {
    return {
        types: [TaskTypes.UPDATE_TASK_REQUEST, TaskTypes.UPDATE_TASK_SUCCESS, TaskTypes.UPDATE_TASK_FAIL],
        callAPI: () => TaskAPI.updateTask(id, data),
        payload: {},
    }
}

export function updateOrderTask(data) {
    return {
        types: [TaskTypes.UPDATE_ORDER_TASK_REQUEST, TaskTypes.UPDATE_ORDER_TASK_SUCCESS, TaskTypes.UPDATE_ORDER_TASK_FAIL],
        callAPI: () => TaskAPI.updateTaskOrder(data),
        payload: {},
    }
}

export function deleteTask(id) {
    return {
        types: [TaskTypes.DELETE_TASK_REQUEST, TaskTypes.DELETE_TASK_SUCCESS, TaskTypes.DELETE_TASK_FAIL],
        callAPI: () => TaskAPI.deleteTask(id),
        payload: {},
    }
}