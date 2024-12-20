import axiosInstance from './axiosConfig'
import {createCancelToken} from "./axiosUtils.js";

const ActionAPI = {
    getActionsByUser: function (userId, page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/action/list/${userId}`,
            params: {
                page,
                limit,
            },
            cancelToken: cancelTokenObject[this.getActionsByUser.name].requestCancellation().token,
        })
    },
    getActionsByTask: function (taskId, page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/action/list-by-task/${taskId}`,
            params: {
                page,
                limit,
            },
            cancelToken: cancelTokenObject[this.getActionsByTask.name].requestCancellation().token,
        })
    },
    updateAction: function (actionId, data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/action/update/${actionId}`,
            data,
            cancelToken: cancelTokenObject[this.getActionsByTask.name].requestCancellation().token,
        })
    },
}

const cancelTokenObject = createCancelToken(ActionAPI);

export default ActionAPI;