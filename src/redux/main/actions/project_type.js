import { ProjectTypeTypes } from '../action_types/index.js';
import ProjectTypeAPI from "../client/project_type";

export function getProjectTypes(page, limit) {
    return {
        types: [
            ProjectTypeTypes.GET_PROJECT_TYPES_REQUEST,
            ProjectTypeTypes.GET_PROJECT_TYPES_SUCCESS,
            ProjectTypeTypes.GET_PROJECT_TYPES_FAIL
        ],
        callAPI: () => ProjectTypeAPI.getProjectTypes(page, limit),
        payload: {},
    }
}

export function addProjectType(data) {
    return {
        types: [
            ProjectTypeTypes.ADD_PROJECT_TYPE_REQUEST,
            ProjectTypeTypes.ADD_PROJECT_TYPE_SUCCESS,
            ProjectTypeTypes.ADD_PROJECT_TYPE_FAIL
        ],
        callAPI: () => ProjectTypeAPI.addProjectType(data),
        payload: {},
    }
}

export function updateProjectType(data) {
    return {
        types: [
            ProjectTypeTypes.UPDATE_PROJECT_TYPE_REQUEST,
            ProjectTypeTypes.UPDATE_PROJECT_TYPE_SUCCESS,
            ProjectTypeTypes.UPDATE_PROJECT_TYPE_FAIL
        ],
        callAPI: () => ProjectTypeAPI.updateProjectType(data),
        payload: {},
    }
}

export function deleteProjectType(id) {
    return {
        types: [
            ProjectTypeTypes.DELETE_PROJECT_TYPE_REQUEST,
            ProjectTypeTypes.DELETE_PROJECT_TYPE_SUCCESS,
            ProjectTypeTypes.DELETE_PROJECT_TYPE_FAIL
        ],
        callAPI: () => ProjectTypeAPI.deleteProjectType(id),
        payload: {id},
    }
}