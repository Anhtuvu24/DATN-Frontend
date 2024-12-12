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
        default:
            return state;
    }
}

export default combineReducers({
    project_types,
    all
})