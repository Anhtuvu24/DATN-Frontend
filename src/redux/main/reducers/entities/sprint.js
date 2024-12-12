import { combineReducers } from 'redux'
import {SprintTypes} from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        // case ProjectTypes.GET_PROJECTS_SUCCESS:
        //     const { data } = action.data;
        //     const obj = arrayToObject(data)
        //     return {
        //         ...state,
        //         ...obj
        //     };
        case SprintTypes.CREATE_SPRINT_SUCCESS:
        case SprintTypes.UPDATE_SPRINT_SUCCESS:
        case SprintTypes.COMPLETE_SPRINT_SUCCESS:
            const { data } = action.data;

            return {
                ...state,
                [data.id]: data,
            }
        // case ProjectTypes.DELETE_PROJECT_SUCCESS:
        //     const { ids } = action;
        //     const newObj = Object.keys(state)
        //         .filter(key => !ids.includes(key))
        //         .reduce((newState, key) => {
        //             newState[key] = state[key];
        //             return newState;
        //         }, {});
        //     return newObj;
        // case ProjectTypes.GET_PROJECT_SUCCESS:
        //     const { data: dataGet } = action.data;
        //     const { active_sprints, ...otherData} = dataGet;
        //     return {
        //         ...state,
        //         [otherData.id]: otherData,
        //     };
        default:
            return state;
    }
}

function sprints(state = {data: []}, action) {
    switch (action.type) {
        // case ProjectTypes.GET_PROJECTS_SUCCESS:
        //     const { data, pagination } = action.data;
        //     return {
        //         ...state,
        //         data,
        //         pagination
        //     };
        case SprintTypes.CREATE_SPRINT_SUCCESS:
            const { data } = action.data;
            return {
                ...state,
                data: [...state.data || [], data],
            }
        case SprintTypes.UPDATE_SPRINT_SUCCESS:
        case SprintTypes.COMPLETE_SPRINT_SUCCESS:
            const { data: _data1 } = action.data;
            const isHave = state.data?.some(item => item.id === _data1.id);
            if (isHave) {
                const newArr = state.data?.map(item => {
                    if (item.id === _data1.id) {
                        return _data1;
                    }
                    return item;
                })
                return {
                    ...state,
                    data: newArr,
                }
            }
            return {
                ...state,
                data: [...state.data || [], _data1],
            }
        // case ProjectTypes.DELETE_PROJECT_SUCCESS:
        //     const { ids } = action;
        //     const newArr1 = state.data.filter(item => !ids.includes(item.id));
        //     return {
        //         ...state,
        //         data: newArr1,
        //     }
        // case ProjectTypes.GET_PROJECT_SUCCESS:
        //     const { data: dataGet } = action.data;
        //     const { active_sprints, ...otherData} = dataGet;
        //     const isHave = state.data?.some(item => item.id === otherData.id);
        //     if (isHave) {
        //         const newArr = state.data.map(item => {
        //             if (item.id === otherData.id) {
        //                 return otherData;
        //             }
        //             return item;
        //         })
        //         return newArr;
        //     } else {
        //         return {
        //             ...state,
        //             data: [...state.data || [], dataGet],
        //         }
        //     }
        default:
            return state;
    }
}

export default combineReducers({
    sprints,
    all,
})