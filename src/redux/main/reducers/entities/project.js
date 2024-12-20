import { combineReducers } from 'redux'
import {ProjectTypes, SprintTypes} from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        case ProjectTypes.GET_PROJECTS_SUCCESS:
            const { data } = action.data;
            const obj = arrayToObject(data)
            return {
                ...state,
                ...obj
            };
        case ProjectTypes.CREATE_PROJECT_SUCCESS:
        case ProjectTypes.UPDATE_PROJECT_SUCCESS:
            const { project } = action.data;
            return {
                ...state,
                [project.id]: project,
            }
        case ProjectTypes.DELETE_PROJECT_SUCCESS:
            const { ids } = action;
            const newObj = Object.keys(state)
                .filter(key => !ids.includes(key))
                .reduce((newState, key) => {
                    newState[key] = state[key];
                    return newState;
                }, {});
            return newObj;
        case ProjectTypes.GET_PROJECT_SUCCESS:
            const { data: dataGet } = action.data;
            const { active_sprints, ...otherData} = dataGet;
            return {
                ...state,
                [otherData.id]: otherData,
            };
        default:
            return state;
    }
}

function projects(state = {}, action) {
    switch (action.type) {
        case ProjectTypes.GET_PROJECTS_SUCCESS:
            const { data, pagination } = action.data;
            return {
                ...state,
                data,
                pagination
            };
        case ProjectTypes.CREATE_PROJECT_SUCCESS:
            const { project } = action.data;
            return {
                ...state,
                data: [...state.data, project],
            }
        case ProjectTypes.UPDATE_PROJECT_SUCCESS:
            const { project: _project } = action.data;
            const newArr = state.data.map(item => {
                if (item.id === _project.id) {
                    return _project;
                }
                return item;
            })
            return {
                ...state,
                data: newArr,
            }
        case ProjectTypes.DELETE_PROJECT_SUCCESS:
            const { ids } = action;
            const newArr1 = state.data.filter(item => !ids.includes(item.id));
            return {
                ...state,
                data: newArr1,
            }
        case ProjectTypes.GET_PROJECT_SUCCESS:
            const { data: dataGet } = action.data;
            const { active_sprints, ...otherData} = dataGet;
            const isHave = state.data?.some(item => item.id === otherData.id);
            if (isHave) {
                const newArr = state.data.map(item => {
                    if (item.id === otherData.id) {
                        return otherData;
                    }
                    return item;
                })
                return {
                    ...state,
                    data: newArr,
                }
            } else {
                return {
                    ...state,
                    data: [...state.data || [], dataGet],
                }
            }
        default:
            return state;
    }
}

function currentProject(state = {}, action) {
    switch (action.type) {
        case ProjectTypes.GET_PROJECT_SUCCESS:
            const { data } = action.data;
            return {
                ...state,
                ...data

            };
        case SprintTypes.CREATE_SPRINT_SUCCESS:
            const { data: _data1 } = action.data;
            return {
                ...state,
                active_sprints: [...state.active_sprints, _data1]
            }
        case SprintTypes.UPDATE_SPRINT_SUCCESS:
            const { data: _data2 } = action.data;
            const newArr = state.active_sprints.map(item => {
                if (item.id === _data2.id) {
                    return _data2
                }
                return item;
            })
            return {
                ...state,
                active_sprints: newArr,
            }
        case SprintTypes.COMPLETE_SPRINT_SUCCESS:
            const { data: _data3 } = action.data;
            const _newArr1 = state.active_sprints.filter(item => item.id !== action.id);
            return {
                ...state,
                active_sprints: _newArr1,
            }
        default:
            return state;
    }
}

export default combineReducers({
    projects,
    all,
    currentProject,
})