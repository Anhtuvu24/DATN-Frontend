import axiosInstance from './axiosConfig'
import {createCancelToken} from "./axiosUtils.js";

const ProjectAPI = {
    getProjects: function (page = 1, limit = 100, search = '') {
        return axiosInstance.request({
            method: 'GET',
            url: `/project/list`,
            params: {
                page,
                limit,
                search,
            },
            cancelToken: cancelTokenObject[this.getProjects.name].requestCancellation().token,
        })
    },
    getProject: function (id) {
        return axiosInstance.request({
            method: 'GET',
            url: `/project/${id}`,
        })
    },
    createProject: function (data) {
        const { icon, ..._data } = data;

        const formData = new FormData();
        formData.append('icon', icon);

        for (const key in _data) {
            if (_data.hasOwnProperty(key)) {
                formData.append(key, _data[key]);
            }
        }

        return axiosInstance.request({
            method: 'POST',
            url: `/project/add`,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData
        });
    },
    updateProject: function (data) {
        return axiosInstance.request({
            method: 'PUT',
            url: `/project/update/${data.id}`,
            data
        })
    },
    deleteProject: function (ids) {
        return axiosInstance.request({
            method: 'DELETE',
            url: `/project/delete`,
            data: {
                ids
            }
        })
    },
}

const cancelTokenObject = createCancelToken(ProjectAPI);

export default ProjectAPI;