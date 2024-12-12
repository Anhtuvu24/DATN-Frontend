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