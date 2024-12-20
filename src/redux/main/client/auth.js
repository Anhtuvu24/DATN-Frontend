import axiosInstance from './axiosConfig'
import {createCancelToken} from "./axiosUtils.js";

const AuthAPI = {
    login: function (gmail, password) {
        let formData = new FormData()
        formData.append('gmail', gmail)
        formData.append('password', password)

        delete axiosInstance.defaults.headers.common['Authorization']
        return axiosInstance.request({
            method: 'POST',
            url: `/users/login`,
            data: formData,
        })
    },
    logout: function () {
        return axiosInstance.request({
            method: 'POST',
            url: '/users/logout',
        })
    },
    getMe: function () {
        return axiosInstance.request({
            method: 'GET',
            url: `/users/me`,
            cancelToken: cancelTokenObject[this.getMe.name].requestCancellation().token,
        })
    },
    uploadAvatar: function (id, file) {
        let formData = new FormData();
        formData.append('avatar', file)
        formData.append('userId', id)
        return axiosInstance.request({
            method: 'POST',
            url: '/users/upload-avatar',
            data: formData,
        })
    },
    updateMe: function (id, data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/users/update-user/${id}`,
            data
        })
    }
}

const cancelTokenObject = createCancelToken(AuthAPI);
export default AuthAPI;