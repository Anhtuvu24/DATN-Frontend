import { FileTypes } from '../action_types/index.js';
import FileAPI from "../client/file.js";

export function createFile(data) {
    return {
        types: [FileTypes.CREATE_FILE_REQUEST, FileTypes.CREATE_FILE_SUCCESS, FileTypes.CREATE_FILE_FAIL],
        callAPI: () => FileAPI.createFile(data),
        payload: {},
    }
}

export function deleteFile(id) {
    return {
        types: [FileTypes.DELETE_FILE_REQUEST, FileTypes.DELETE_FILE_SUCCESS, FileTypes.DELETE_FILE_FAIL],
        callAPI: () => FileAPI.deleteFile(id),
        payload: {},
    }
}