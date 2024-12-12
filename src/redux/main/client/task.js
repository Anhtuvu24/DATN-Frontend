import axiosInstance from './axiosConfig'

const TaskAPI = {
    getTasks: function (sprintId) {
        return axiosInstance.request({
            method: 'GET',
            url: `/task/tasks/${sprintId}`,
        })
    },
    getTask: function (id) {
        return axiosInstance.request({
            method: 'GET',
            url: `/task/${id}`,
        })
    },
    createTask: function (data) {
        const { files, ...otherData } = data;
        const formData = new FormData();

        // Append other data fields to formData
        Object.keys(otherData).forEach(key => {
            formData.append(key, otherData[key]);
        });

        // Append files to formData
        if (files && files.length > 0) {
            files.forEach((file, index) => {
                formData.append(`files`, file);
            });
        }

        return axiosInstance.request({
            method: 'POST', // Thay đổi phương thức thành POST nếu cần
            url: `/task/add`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateTask: function (id, data) {
      return axiosInstance.request({
          method: 'PUT',
          url: `/task/update/${id}`,
          data
      })
    },
    updateTaskOrder: function (data) {
        return axiosInstance.request({
            method: 'PUT', // Thay đổi phương thức thành POST nếu cần
            url: `/task/update-order`,
            data,
        });
    },
    deleteTask: function (id) {
        return axiosInstance.request({
            method: 'DELETE',
            url: `/task/delete/${id}`,
        })
    }
}

export default TaskAPI;