import actions, { getView } from './actions'
const initState = {
  view: getView(window.innerWidth),
  height: window.innerHeight,
  current: 'board',
  current_admin: 'role_assignment'
}

export default function appReducer(state = initState, action) {
  switch (action.type) {
    case actions.TOGGLE_ALL:
      if (state.view !== action.view || action.height !== state.height) {
        const height = action.height ? action.height : state.height
        return {
          ...state,
          collapsed: action.collapsed,
          view: action.view,
          height,
        }
      }
      break
    case actions.CHANGE_CURRENT:
      return {
        ...state,
        current: action.key,
      }
    case actions.CHANGE_CURRENT_ADMIN:
      return {
        ...state,
        current_admin: action.key,
      }
    default:
      return state
  }
  return state
}
