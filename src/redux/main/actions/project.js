import { ProjectTypes } from '../action_types/index.js';
import ProjectAPI from "../client/project.js";

export function getProjects(page, limit, search) {
    return {
        types: [ProjectTypes.GET_PROJECTS_REQUEST, ProjectTypes.GET_PROJECTS_SUCCESS, ProjectTypes.GET_PROJECTS_FAIL],
        callAPI: () => ProjectAPI.getProjects(page, limit, search),
        payload: {},
    }
}

export function getProject(id) {
    return {
        types: [ProjectTypes.GET_PROJECT_REQUEST, ProjectTypes.GET_PROJECT_SUCCESS, ProjectTypes.GET_PROJECT_FAIL],
        callAPI: () => ProjectAPI.getProject(id),
        payload: {},
    }
}

export function createProject(data) {
    return {
        types: [ProjectTypes.CREATE_PROJECT_REQUEST, ProjectTypes.CREATE_PROJECT_SUCCESS, ProjectTypes.CREATE_PROJECT_FAIL],
        callAPI: () => ProjectAPI.createProject(data),
        payload: {},
    }
}

export function updateProject(data) {
    return {
        types: [ProjectTypes.UPDATE_PROJECT_REQUEST, ProjectTypes.UPDATE_PROJECT_SUCCESS, ProjectTypes.UPDATE_PROJECT_FAIL],
        callAPI: () => ProjectAPI.updateProject(data),
        payload: {},
    }
}

export function deleteProject(ids) {
    return {
        types: [ProjectTypes.DELETE_PROJECT_REQUEST, ProjectTypes.DELETE_PROJECT_SUCCESS, ProjectTypes.DELETE_PROJECT_FAIL],
        callAPI: () => ProjectAPI.deleteProject(ids),
        payload: {ids},
    }
}
