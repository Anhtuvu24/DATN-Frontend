import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer'
import { callAPIMiddleware } from './middleware'
import { persistStore } from 'redux-persist'

const middlewares = [callAPIMiddleware, thunk]

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

let persistor = persistStore(store)

export { store, persistor }
