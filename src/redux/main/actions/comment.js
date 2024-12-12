import { CommentTypes } from '../action_types/index.js';
import CommentAPI from "../client/comment.js";

export function createComment(data) {
    return {
        types: [CommentTypes.CREATE_COMMENT_REQUEST, CommentTypes.CREATE_COMMENT_SUCCESS, CommentTypes.CREATE_COMMENT_FAIL],
        callAPI: () => CommentAPI.createComment(data),
        payload: {},
    }
}

export function updateComment(id, text) {
    return {
        types: [CommentTypes.UPDATE_COMMENT_REQUEST, CommentTypes.UPDATE_COMMENT_SUCCESS, CommentTypes.UPDATE_COMMENT_FAIL],
        callAPI: () => CommentAPI.updateComment(id, text),
        payload: {},
    }
}

export function deleteComment(id) {
    return {
        types: [CommentTypes.DELETE_COMMENT_REQUEST, CommentTypes.DELETE_COMMENT_SUCCESS, CommentTypes.DELETE_COMMENT_FAIL],
        callAPI: () => CommentAPI.deleteComment(id),
        payload: {},
    }
}
