import axiosInstance from './axiosConfig'
import {createCancelToken} from "./axiosUtils.js";

const UserAPI = {
    getUsers: function (page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/users/get-users`,
            params: {
                page,
                limit,
            },
            cancelToken: cancelTokenObject[this.getUsers.name].requestCancellation().token,
        })
    },
    changePassword: function (userId, currentPassword, newPassword) {
        return axiosInstance.request({
            method: 'PUT',
            url: `users/change-password/${userId}`,
            data: {
                currentPassword,
                newPassword
            }
        })
    },
    forgotPassword: function (gmail) {
        return axiosInstance.request({
            method: 'PUT',
            url: `users/forgot-password`,
            data: {
                gmail
            }
        })
    },
    updateUser: function (id, data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `users/update-user/${id}`,
            data
        })
    },
    createUser: function (data) {
        return axiosInstance.request({
            method: 'POST',
            url: 'users/add-user',
            data
        })
    }
}

const cancelTokenObject = createCancelToken(UserAPI);

export default UserAPI;