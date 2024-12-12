import axiosInstance from './axiosConfig'

const FileAPI = {
    createFile: function (data) {
        const { files, ...otherData } = data;
        const formData = new FormData();

        // Append other data fields to formData
        Object.keys(otherData).forEach(key => {
            formData.append(key, otherData[key]);
        });
        if (files && files.length > 0) {
            files.forEach((file, index) => {
                formData.append(`files`, file);
            });
        }
        return axiosInstance.request({
            method: 'POST',
            url: `/file/upload`,
            data: formData,
        })
    },
    deleteFile: function (id) {
        return axiosInstance.request({
            method: 'DELETE',
            url: `file/delete/${id}`,
        })
    }
}

export default FileAPI;