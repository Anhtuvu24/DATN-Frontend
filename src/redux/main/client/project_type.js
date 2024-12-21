import axiosInstance from './axiosConfig'

const ProjectTypeAPI = {
    getProjectTypes: function (page = 1, limit = 100) {
        return axiosInstance.request({
            method: 'GET',
            url: `/project-type/list`,
            params: {
                page,
                limit,
            }
        })
    },
    addProjectType: function (data) {
        return axiosInstance.request({
            method: 'POST',
            url: `/project-type/add`,
            data
        })
    },
    updateProjectType: function (data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/project-type/update`,
            data
        })
    },
    deleteProjectType: function (id) {
        return axiosInstance.request({
            method: 'DELETE',
            url: `/project-type/delete/${id}`,
        })
    },
}

export default ProjectTypeAPI;