import axiosInstance from './axiosConfig'

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
        })
    }
}

export default AuthAPI;