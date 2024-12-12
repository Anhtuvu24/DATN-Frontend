import { combineReducers } from 'redux'
import App from './app/reducer.js'
import main from '../redux/main/reducers'

const appReducer = combineReducers({
  App,
  main,
})

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  // if (action.type === AuthTypes.LOGOUT_SUCCESS) {
  //   state = undefined
  // }
  return appReducer(state, action)
}

export default rootReducer
