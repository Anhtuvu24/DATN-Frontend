import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api',
    paramsSerializer: function (params) {
        return qs.stringify(cleanObject(params))
    },
})

export const setAuthorization = (token, refreshToken) => {
    instance.defaults.headers.common = {
        Authorization: 'Bearer ' + token,
        'x-refresh-token': refreshToken
    }
}

export default instance

const cleanObject = p => {
    const params = { ...p }
    for (const key of Object.keys(params)) {
        const value = String(params[key])
        if (value === 'null' || value === 'undefined' || value === '') {
            delete params[key]
        }
    }
    return params
}
