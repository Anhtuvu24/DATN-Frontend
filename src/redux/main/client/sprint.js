import axiosInstance from './axiosConfig'

const SprintAPI = {
    createSprint: function (data) {
        return axiosInstance.request({
            method: 'POST',
            url: `/sprint/add`,
            data
        })
    },
    updateSprint: function (id, data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/sprint/update/${id}`,
            data
        })
    },
}

export default SprintAPI;