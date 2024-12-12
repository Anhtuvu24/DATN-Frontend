import { StatusTypes } from '../action_types/index.js';
import StatusAPI from "../client/status.js";

export function getStatuses(page, limit) {
    return {
        types: [StatusTypes.GET_STATUSES_REQUEST, StatusTypes.GET_STATUSES_SUCCESS, StatusTypes.GET_STATUSES_FAIL],
        callAPI: () => StatusAPI.getStatuses(page, limit),
        payload: {},
    }
}