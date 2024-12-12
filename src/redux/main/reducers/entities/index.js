import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

// Reducers
import auth from './auth.js';
import user from './users.js';
import project from './project.js';
import project_type from './project_type.js';
import status from './status.js';
import sprint from './sprint.js';
import task from './task.js';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth']
}

export default combineReducers({
    auth: persistReducer(authPersistConfig, auth),
    user,
    project,
    project_type,
    status,
    sprint,
    task,
})