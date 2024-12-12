import axiosInstance from './axiosConfig'

const StatusAPI = {
    getStatuses: function (page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/status/list`,
            params: {
                page,
                limit,
            }
        })
    },
}

export default StatusAPI;