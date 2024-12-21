import { combineReducers } from 'redux'
import { ProjectTypeTypes } from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        case ProjectTypeTypes.GET_PROJECT_TYPES_SUCCESS:
            const { data } = action.data;
            const obj = arrayToObject(data)
            return {
                ...state,
                ...obj
            };
        case ProjectTypeTypes.ADD_PROJECT_TYPE_SUCCESS:
            const { projectType: newProjectType } = action.data;
            return {
                ...state,
                [newProjectType.id]: newProjectType
            };
        case ProjectTypeTypes.DELETE_PROJECT_TYPE_SUCCESS:
            const newProjectTypes1 = state;
            delete newProjectTypes1[action.id];
            return newProjectTypes1;
        case ProjectTypeTypes.UPDATE_PROJECT_TYPE_SUCCESS:
            const { projectType: newProjectType2 } = action.data;
            return {
                ...state,
                [newProjectType2.id]: newProjectType2
            };
        default:
            return state;
    }
}

function project_types(state = {}, action) {
    switch (action.type) {
        case ProjectTypeTypes.GET_PROJECT_TYPES_SUCCESS:
            const { data, pagination } = action.data;
            return {
                ...state,
                data,
                pagination
            };
        case ProjectTypeTypes.ADD_PROJECT_TYPE_SUCCESS:
            const { projectType: newProjectType } = action.data;
            return {
                ...state,
                data: [...state.data, newProjectType],
            };
        case ProjectTypeTypes.DELETE_PROJECT_TYPE_SUCCESS:
            const newProjectTypes1 = state.data.filter(item => item.id !== action.id);
            return {
                ...state,
                data: newProjectTypes1
            };
        case ProjectTypeTypes.UPDATE_PROJECT_TYPE_SUCCESS:
            const { projectType: newProjectType2 } = action.data;
            const newProjectTypes2 = state.data.map(item => {
                if (item.id === newProjectType2.id) {
                    return newProjectType2;
                }
                return item;
            });
            return {
                ...state,
                data: newProjectTypes2
            };
        default:
            return state;
    }
}

export default combineReducers({
    project_types,
    all
})