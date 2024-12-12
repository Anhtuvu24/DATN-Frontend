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
}

export default ProjectTypeAPI;