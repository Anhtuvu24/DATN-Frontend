import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";

// Reducers
import auth from './auth.js';

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    whitelist: ['auth']
}

export default combineReducers({
    auth: persistReducer(authPersistConfig, auth)
})