import axiosInstance from './axiosConfig'

const UserAPI = {
    getUsers: function (page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/users/get-users`,
            params: {
                page,
                limit,
            }
        })
    },
}

export default UserAPI;