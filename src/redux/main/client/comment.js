import axiosInstance from './axiosConfig'

const CommentAPI = {
    createComment: function (data) {
        return axiosInstance.request({
            method: 'POST',
            url: `/comment/add`,
            data
        })
    },
    updateComment: function (id, text) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/comment/update/${id}`,
            data: {
                text
            }
        })
    },
    deleteComment: function (id) {
        return axiosInstance.request({
            method: 'DELETE',
            url: `/comment/delete/${id}`,
        })
    },
}

export default CommentAPI;