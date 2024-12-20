import { combineReducers } from 'redux'
import {StatusTypes} from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        case StatusTypes.GET_STATUSES_SUCCESS:
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

function statuses(state = [], action) {
    switch (action.type) {
        case StatusTypes.GET_STATUSES_SUCCESS:
            const { data } = action.data;
            return data
        default:
            return state;
    }
}

export default combineReducers({
    statuses,
    all
})