import { StatusTypes, SprintTypes } from '../action_types/index.js';
import SprintAPI from "../client/sprint.js";

export function createSprint(data) {
    return {
        types: [SprintTypes.CREATE_SPRINT_REQUEST, SprintTypes.CREATE_SPRINT_SUCCESS, SprintTypes.CREATE_SPRINT_FAIL],
        callAPI: () => SprintAPI.createSprint(data),
        payload: {},
    }
}

export function updateSprint(id, data) {
    return {
        types: [SprintTypes.UPDATE_SPRINT_REQUEST, SprintTypes.UPDATE_SPRINT_SUCCESS, SprintTypes.UPDATE_SPRINT_FAIL],
        callAPI: () => SprintAPI.updateSprint(id, data),
        payload: {},
    }
}

export function completeSprint(id, data) {
    return {
        types: [SprintTypes.COMPLETE_SPRINT_REQUEST, SprintTypes.COMPLETE_SPRINT_SUCCESS, SprintTypes.COMPLETE_SPRINT_FAIL],
        callAPI: () => SprintAPI.updateSprint(id, data),
        payload: {id},
    }
}