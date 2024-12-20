import { combineReducers } from 'redux'
import {UserTypes, TaskTypes, FileTypes, CommentTypes} from "../../action_types/index.js";
import {arrayToObject} from "../../../../utils/helper.js";

function all(state = {}, action) {
    switch (action.type) {
        // case UserTypes.GET_USERS_SUCCESS:
        //     const { users } = action.data;
        //     const obj = arrayToObject(users)
        //     return {
        //         ...state,
        //         ...obj
        //     };
        case TaskTypes.CREATE_TASK_SUCCESS:
            const { data } = action.data;
            const { files, task } = data;
            return {
                ...state,
                [task.id]: {
                    files,
                    task
                }
            };
        default:
            return state;
    }
}

function tasks(state = {}, action) {
    switch (action.type) {
        case TaskTypes.GET_TASKS_SUCCESS:
            const { data } = action;
            return {
                ...state,
                [data.sprint_id]: data.tasks_by_status,
            };
        case TaskTypes.CREATE_TASK_SUCCESS:
            const { data: _data1 } = action.data;
            const { task } = _data1;
            const sprintId = task.id_sprint; // Lấy sprint ID từ task mới
            const statusId = task.id_status; // Lấy status ID từ task mới

            // Lấy danh sách `tasks_by_status` hiện tại của sprint hoặc khởi tạo nếu chưa có
            const currentTasksByStatus = state[sprintId] || [];

            // Tạo `tasks_by_status` mới với task được thêm vào trạng thái phù hợp
            const updatedTasksByStatus = currentTasksByStatus.map((status) => {
                if (status.id === statusId) {
                    // Nếu là trạng thái phù hợp, thêm task mới vào `tasks`
                    return {
                        ...status,
                        tasks: [...status.tasks, task],
                    };
                }
                return status; // Giữ nguyên các trạng thái khác
            });

            return {
                ...state,
                [sprintId]: updatedTasksByStatus,
            };
        case TaskTypes.UPDATE_ORDER_TASK_SUCCESS:
            const { updated_task, sprint_id, task: currentTask, lastStatusId, updatedTasksByStatus: _updatedTasksByStatus } = action.data;
            const { id: taskId, id_status: newStatusId, index: newIndex } = updated_task;

            const sprintIdForUpdate = sprint_id;
            const updatedTasksByStatusForUpdate = state[sprintIdForUpdate].map((status) => {
                if (_updatedTasksByStatus[status.id]) {
                    return {
                        ...status,
                        tasks: _updatedTasksByStatus[status.id], // Sử dụng danh sách tasks được trả về từ API
                    };
                }
                return status;
            });

            return {
                ...state,
                [sprintIdForUpdate]: updatedTasksByStatusForUpdate,
            };
        case TaskTypes.DELETE_TASK_SUCCESS:
            const { id_sprint, id_status, updatedTasksByStatus: _updatedTasksByStatus1 } = action.data;
            const updatedTasksByStatusForUpdate1 = state[id_sprint].map((status) => {
                if (_updatedTasksByStatus1[status.id]) {
                    return {
                        ...status,
                        tasks: _updatedTasksByStatus1[status.id], // Sử dụng danh sách tasks được trả về từ API
                    };
                }
                return status;
            });
            return {
                ...state,
                [id_sprint]: updatedTasksByStatusForUpdate1,
            }
        default:
            return state;
    }
}

function currentTask(state = {}, action) {
    switch (action.type) {
        case TaskTypes.GET_TASK_SUCCESS:
            const { task } = action.data;
            return {
                ...state,
                ...task
            }
        case FileTypes.CREATE_FILE_SUCCESS:
            const { uploadedFiles } = action.data;
            return {
                ...state,
                files: [...state.files, ...uploadedFiles],
            };
        case CommentTypes.CREATE_COMMENT_SUCCESS:
            const { commentWithUser } = action.data;
            return {
                ...state,
                comments: [commentWithUser, ...state.comments ],
            }
        case CommentTypes.UPDATE_COMMENT_SUCCESS:
            const { updatedCommentWithUser } = action.data;
            const newCommemts = state.comments.map(item => {
                if (item.id === updatedCommentWithUser.id) {
                    return updatedCommentWithUser;
                }
                return item;
            })
            return {
                ...state,
                comments: newCommemts,
            }
        case CommentTypes.DELETE_COMMENT_SUCCESS:
            const { data: dataDelete } = action.data;
            const newComents1 = state.comments?.filter(item => item.id !== dataDelete?.id);
            return {
                ...state,
                comments: newComents1,
            }
        case FileTypes.DELETE_FILE_SUCCESS:
            const { deletedId } = action.data;
            const newFiles = state.files.filter(item => item.id !== deletedId);
            return {
                ...state,
                files: newFiles,
            };
        case TaskTypes.UPDATE_TASK_SUCCESS:
            const { data } = action.data;
            return {
                ...state,
                data,
            };
        default:
            return state;
    }
}

function searchTasks(state= {}, action) {
    switch (action.type) {
        case TaskTypes.SEARCH_TASKS_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    tasks,
    all,
    currentTask,
    searchTasks
})